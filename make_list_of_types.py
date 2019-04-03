"""
Usage: python3 make_list_of_types.py

"""
import math
import re
import urllib.request
from collections import namedtuple


################
# records
################
File = namedtuple(
    "File",
    # string  # string
    ["filepath", "display"],
)
Group = namedtuple(
    "Group",
    [
        "heading",  # string (heading text)
        "id",  # string (used as html id attribute and to key into other data structures)
        "github_url",  # string
        "raw_url",  # string
        "files",  # File[]
    ],
)
GroupResult = namedtuple("GroupResult", ["heading", "id", "type_results"])
LinkInfo = namedtuple(
    "LinkInfo",
    [
        "display",  # string
        "type",  # interface | type | var | const | function | namespace
        "file_key",  # string
        "github_url",  # string
        "filepath",  # string
        "line_no",  # number
    ],
)
TypeResult = namedtuple(
    "TypeResult",
    [
        "version",  # string
        "name",  # string
        "variations",  # LinkInfo[]
        "members",  # TypeResult[] | None
    ],
)


################
# constants
################
DEFINITELY_BASE_URL = "https://github.com/DefinitelyTyped/DefinitelyTyped/tree"
DEFINITELY_RAW_BASE_URL = (
    "https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped"
)
OUTPUT_TEMPLATE = "LIST_OF_TYPES.md"
DEFINITELY_VERSION = "8201a5f"
VERSIONS = [
    {
        "cheatsheet": DEFINITELY_VERSION,
        "react": DEFINITELY_VERSION,
        "react-dom": DEFINITELY_VERSION,
        "react-dom/server": DEFINITELY_VERSION,
        "react-dom/test-utils": DEFINITELY_VERSION,
        "react-native": DEFINITELY_VERSION,
    }
]
GROUPS = [
    Group(
        "react",
        "react",
        DEFINITELY_BASE_URL,
        DEFINITELY_RAW_BASE_URL,
        [File("types/react/index.d.ts", "react")],
    ),
    Group(
        "react-dom",
        "react-dom",
        DEFINITELY_BASE_URL,
        DEFINITELY_RAW_BASE_URL,
        [File("types/react-dom/index.d.ts", "react-dom")],
    ),
    Group(
        "react-dom/server",
        "react-dom/server",
        DEFINITELY_BASE_URL,
        DEFINITELY_RAW_BASE_URL,
        [File("types/react-dom/server/index.d.ts", "react-dom-server")],
    ),
    Group(
        "react-dom/test-utils",
        "react-dom/test-utils",
        DEFINITELY_BASE_URL,
        DEFINITELY_RAW_BASE_URL,
        [File("types/react-dom/test-utils/index.d.ts", "react-dom-test-utils")],
    ),
    Group(
        "react-native",
        "react-native",
        DEFINITELY_BASE_URL,
        DEFINITELY_RAW_BASE_URL,
        [File("types/react-native/index.d.ts", "react-native")],
    ),
]


################
# main
################
def main():
    for version_map in VERSIONS:
        group_results = get_group_results(version_map)
        write_output(group_results, version_map)


################
# get_group_results
################
def get_group_results(version_map):
    """get results for all files
    """
    group_results = []
    for heading, id, github_url, raw_url, files in GROUPS:
        version = version_map[id]
        type_results = []

        for filepath, display in files:
            full_raw_url = f"{raw_url}/{version}/{filepath}"
            print("full_raw_url", full_raw_url)
            body = download_file(full_raw_url)
            type_results = parse_file(
                type_results, body, github_url, version, filepath, display
            )
        type_results = post_process(type_results)
        group_results.append(GroupResult(heading, id, type_results))
    return group_results


def download_file(url):
    response = urllib.request.urlopen(url)
    body = response.read().decode("utf-8")
    return body


def parse_file(type_results, body, github_url, version, filepath, file_key):
    """extract types from the file using regular expressions
    """
    namespace = None
    multiline = False
    for single_line_index, single_line in enumerate(body.splitlines()):

        # multi-line handling... if the line starts a type declaration but
        # finishes on a subsequent line, enter multiline state and start
        # concatenating lines until the final character is found.
        CHAR_DENOTING_END_OF_MULTILINE = {"declare class": "{", "type": "="}

        # start of multi-line
        match = re.search(r"^\s*(declare class|type) .+", single_line)
        if (
            match
            and CHAR_DENOTING_END_OF_MULTILINE[match.group(1)]
            not in single_line
        ):
            multiline = True
            line_index = single_line_index
            line = single_line
            end_char = CHAR_DENOTING_END_OF_MULTILINE[match.group(1)]
            continue

        # in multiline state
        elif multiline:
            line = line + single_line
            # end of multiline
            if end_char in single_line:
                multiline = False
            # still in multiline state
            else:
                continue

        # not a multiline, treat as normal
        else:
            line_index = single_line_index
            line = single_line

        # start of a namespace
        match = re.search(
            r"^\s*(export\s+)?(declare\s+)?(?P<type>namespace|module)\s+(?P<name>.+)\s*{",
            line,
        )
        if match:
            namespace = TypeResult(
                version,
                match.group("name"),
                variations=[
                    LinkInfo(
                        display=match.group("name"),
                        type=match.group("type"),
                        file_key=file_key,
                        github_url=github_url,
                        filepath=filepath,
                        line_no=line_index + 1,
                    )
                ],
                members=[],
            )
            continue

        # end of a namespace
        match = re.search(r"^}", line)
        if match and namespace:
            print("Members count: ", len(namespace.members))
            type_results.append(namespace)
            namespace = None
            continue

        # choose whether to append matches to namespace.members or the
        # top-level results list
        if namespace:
            appender = namespace.members
        else:
            appender = type_results

        def add_result(pattern, type):
            match = re.search(pattern, line)
            if not match:
                return
            link_info = LinkInfo(
                display=match.group("name") + match.groupdict().get("sig", ""),
                type=type,
                file_key=file_key,
                github_url=github_url,
                filepath=filepath,
                line_no=line_index + 1,
            )
            existing_result = next(
                (x for x in appender if x.name == match.group("name")), None
            )
            if existing_result:
                existing_result.variations.append(link_info)
            else:
                appender.append(
                    TypeResult(
                        version,
                        match.group("name"),
                        variations=[link_info],
                        members=None,
                    )
                )

        # e.g. interface Element extends React.ReactElement<any, any> {
        add_result(
            r"^\s*(export\s+)?interface\s+(?P<name>\w+)(?P<sig>\s+extends\s+[^<]*\s*\<.*\>).*{",
            "interface",
        )
        # e.g. interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> {
        add_result(
            r"^\s*(export\s+)?interface\s+(?P<name>\w+)(?P<sig>\<.*\>).*{",
            "interface",
        )
        # e.g. interface IntrinsicElements {
        add_result(
            r"^\s*(export\s+)?interface\s+(?P<name>\w+)[^<]*{", "interface"
        )
        add_result(r"^\s*(export\s+)?type\s+(?P<name>[^=]+)\s+=", "type")
        add_result(
            r"^\s*(export\s+)?(declare\s+)?var\s+(?P<name>[^:]+)\s*:", "var"
        )
        add_result(
            r"^\s*(export\s+)?(declare\s+)?const\s+(?P<name>[^:]+)\s*:", "const"
        )
        add_result(
            r"^\s*(export\s+)?(declare\s+)?function\s+(?P<name>\w+)(?P<sig>\<.*\>)\(",
            "function",
        )
        add_result(
            r"^\s*(export\s+)?(declare\s+)?function\s+(?P<name>\w+)[^<]*\(",
            "function",
        )

    print("Count:", len(type_results))
    return type_results


def post_process(type_results):
    """sort and clean the results
    """

    def transform_result(type_result):
        version, name, variations, members = type_result
        variations = sorted(variations, key=lambda x: len(x.display))
        variations = sorted(variations, key=lambda x: x.type)
        if members:
            members = post_process(members)
        return TypeResult(version, name, variations, members)

    type_results = [transform_result(result) for result in type_results]
    type_results = sorted(type_results, key=lambda result: result.name.lower())
    return type_results


################
# write_output
################
def write_output(group_results, version_map):
    cheatsheet_version = version_map["cheatsheet"]
    fout = open(
        OUTPUT_TEMPLATE.format(cheatsheet_version=cheatsheet_version), "w"
    )
    write_header(fout)
    write_table_of_contents(fout)
    write_panels_of_results(fout, group_results)
    fout.close()


def write_header(fout):
    fout.write(
        '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">\n\n'
    )


def write_table_of_contents(fout):
    lines = [
        f'<li><a href="#{group.id}">{group.heading}</a></li>\n'
        for group in GROUPS
    ]
    write_panel_with_3_columns(
        fout, lines, '<h4 id="toc">Table of Contents</h4>'
    )


def write_panels_of_results(fout, group_results):
    for heading, id, type_results in group_results:
        lines = generate_output_lines(type_results)
        write_panel_with_3_columns(fout, lines, f"<h4 id={id}>{heading}</h4>")


def generate_output_lines(type_results):
    """generate html output lines to write for a list of results
    """
    output_lines = []
    for type_result in type_results:
        lines = generate_result(type_result)
        output_lines.extend(lines)
    return output_lines


# TODO: <ul> and <li> tags should not be added both here and in write_panel
# _with_3_columns()
def generate_result(type_result):
    """recursively generate html lines to write starting at a single result
    """
    lines = []
    version, name, variations, members = type_result
    if members:
        link = generate_alinks(version, variations)
        lines.append("<li>{link}<ul>".format(link=link))
        for child_result in members:
            child_lines = generate_result(child_result)
            lines.extend(child_lines)
        # mutate list so that <ul> tags don't count as items in the list when
        # grouping columns
        lines[-1] = "{last_line}</ul></li>".format(last_line=lines[-1])
    else:
        link = generate_alinks(version, variations)
        lines.append("<li>{link}</li>".format(link=link))
    return lines


def generate_alinks(version, variations):
    """return html for a single <a> link
    """
    interface_variations = [x for x in variations if x.type == "interface"]
    other_variations = [x for x in variations if x.type != "interface"]

    alinks = []
    for (
        index,
        (display, type, file_key, github_url, filepath, line_no),
    ) in enumerate(interface_variations):
        github_url = f"{github_url}/{version}/{filepath}#L{line_no}"
        display = html_escape(display)

        if len(interface_variations) == 1:
            alinks.append(
                f'<a href="{github_url}">{display}</a> <small>({type})</small>'
            )
            continue

        if index == 0:
            alink = f'<a href="{github_url}">{display} <small>{file_key}</small></a>'
        else:
            alink = f'<a href="{github_url}"><small>{file_key}</small></a>'
        if index == len(interface_variations) - 1:
            alink += f" <small>({type})</small>"
        alinks.append(alink)

    for (
        display,
        type,
        file_key,
        github_url,
        filepath,
        line_no,
    ) in other_variations:
        github_url = f"{github_url}/{version}/{filepath}#L{line_no}"
        display = html_escape(display)
        alinks.append(
            f'<a href="{github_url}">{display}</a> <small>({type})</small>'
        )

    return " &#8729; ".join(alinks)


def write_panel_with_3_columns(fout, items, heading):
    """group items into 3 columns of ~equal length and write as bootstrap columns
    """
    N_COLUMNS = 3.0
    rows_per_col = int(math.ceil(len(items) / N_COLUMNS))
    grouped = []
    group = []
    row_count = 0

    for item in items:
        group.append(item)

        row_count += 1
        if row_count >= rows_per_col:
            grouped.append(group)
            group = []
            row_count = 0

    if group:
        grouped.append(group)

    # start bootstrap panel
    fout.write('<div class="panel panel-default">\n')
    fout.write(f'<div class="panel-heading">{heading}</div>\n')
    fout.write('<div class="panel-body">\n')
    fout.write('<div class="row">\n')

    # start bootstrap columns
    ul_tag_count = 0
    for group in grouped:
        extra_ul_tags = "<ul>" * ul_tag_count
        fout.write('<div class="col-sm-4"><ul>' + extra_ul_tags + "\n")
        for line in group:
            if "<ul>" in line:
                ul_tag_count += 1
            if "</ul>" in line:
                ul_tag_count -= 1
            fout.write(line + "\n")
        extra_ul_tags = "</ul>" * ul_tag_count
        fout.write(extra_ul_tags + "</ul></div>\n")
    # end bootstrap columns

    fout.write("</div></div></div>\n")
    # end bootstrap panel


def html_escape(text):
    text = text.replace("&", "&amp;")
    text = text.replace("<", "&lt;")
    text = text.replace(">", "&gt;")
    return text


if __name__ == "__main__":
    main()
