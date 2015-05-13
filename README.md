# Spark Core Chrome "Smart" Connect

## Simple Chrome App to connect the Spark Core to the local WiFi using a serial connection.

### Updates 

2015-05-13: The app is now working in beta. It does not support connecting multiple devices simultaneously, i.e. you can only have one spark device connected via USB at a time. It also has not yet been thoroughly tested.

### Description

I have found the existing TI Smart Config to be too unreliable on the CC3000 chip to package as the only way for clients to connect devices built on the Spark Core. However, for the average person, connecting using a typical serial terminal (Tera Term, Screen... etc.) is a daunting undertaking.

This simple app instead uses Chrome's [serial library](https://developer.chrome.com/apps/serial) to connect the core. There isn't anything particularly "smart" about it... but it's more reliable than mobile apps.

### Instructions for Use

When completed the connection process will be:

1. Download and install the App from the Chrome Web Store (not yet available), 
b. *OR* clone/download this repository and follow Google's [instructions](https://developer.chrome.com/apps/first_app#load) to add to Chrome.
2. Download and install the [Spark Drivers](https://s3.amazonaws.com/spark-website/Spark.zip) (Windows only, Mac/Linux skip this step),
3. Plug your Spark device into your computer via USB and run the App,
4. Enter WiFi credentials and connect.

### Contributing

If you have comments or ideas please open an issue.

For more information on the Spark Core see [docs.spark.io](https://docs.spark.io)

**This project is licensed under the terms of the MIT license.**