import time

import requests
from datetime import datetime
import smtplib
from email.message import EmailMessage

my_email = "Your_id"
password = "Your_password"
other_email = "senders_id"
MY_LAT =12.971599
MY_LONG =77.594566


def is_iss_overhead():
    response = requests.get(url="http://api.open-notify.org/iss-now.json")
    response.raise_for_status()
    data = response.json()

    iss_latitude = float(data["iss_position"]["latitude"])
    iss_longitude = float(data["iss_position"]["longitude"])

    #Your position is within +5 or -5 degrees of the ISS position.
    if MY_LAT-5<= iss_latitude <=MY_LAT+5 and MY_LONG-5<= iss_latitude <=MY_LONG+5:
        return True


def is_night():
    parameters = {
        "lat": MY_LAT,
        "lng": MY_LONG,
        "formatted": 0,
    }

    response = requests.get("https://api.sunrise-sunset.org/json", params=parameters)
    response.raise_for_status()
    data = response.json()
    sunrise = int(data["results"]["sunrise"].split("T")[1].split(":")[0])
    sunset = int(data["results"]["sunset"].split("T")[1].split(":")[0])

    time_now = datetime.now().hour

    #If the ISS is close to my current position
    # and it is currently dark
    # Then send me an email to tell me to look up.
    # BONUS: run the code every 60 seconds.


    if time_now >=sunset or time_now<=sunrise:
        return True



while True:
    time.sleep(60)

    if is_iss_overhead() and is_night():
        msg = EmailMessage()
        msg.set_content(" iss is overhead ")

        msg['Subject'] = 'WOAHHHH it is overhead'
        msg['From'] = my_email
        msg['To'] = other_email



        with smtplib.SMTP('smtp.gmail.com', port=587) as server:
            server.starttls()
            server.login(my_email,password=password)
            server.send_message(msg)

