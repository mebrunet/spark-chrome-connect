# Spark Core Chrome "Smart" Connect

### Simple Chrome App to connect the Spark Core to the local WiFi using a serial connection.

#### Updates 

2015-05-13: The app now works. However, it does not support connecting multiple devices simultaneously. Will push to Chrome Web Store shortly.

#### Description

I have found the existing TI Smart Config to be too unreliable on the CC3000 chip to package as the only way for clients to connect devices built on the Spark Core. However, for the average person, connecting using a typical serial terminal (Tera Term, Screen... etc.) is a dauting undertaking.

This simple app uses Chrome's [serial library](https://developer.chrome.com/apps/serial) to connect the core. When completed the connection process will be:

1. Download and install the App from the Chrome Web Store,
2. Download and install the [Spark Drivers](https://s3.amazonaws.com/spark-website/Spark.zip) (Windows only),
3. Plug your Spark device into your computer via USB and run the App,
4. Enter WiFi credentials and connect.

If you have comments or ideas please open an issue.

For more information on the Spark Core see [docs.spark.io](https://docs.spark.io)