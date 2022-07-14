# Training Club Client
### Introduction
This repository houses all code used to produce the cross-platform mobile client for Training Club.  
  
Training Club Client is written as a bare React Native app, utilizing Kotlin + Java for Android and Swift for iOS paired together with a JavaScript rendering engine (JSC).  
  
To get started, see [Getting Started]('')  
  
### Project Overview
* **.github/workflows** - CI/CD Pipeline
* **__tests** - Jest Test Files
* **_bundle** - Ruby Bundling Configuration Files
* **android** - Android Native Code
* **ios** - iOS Native Code
* **src** - JavaScript Source Code
  * **assets** - Images, SVGs and Videos rendered throughout the client
  * **components**
    * **atoms** - Lowest level reuseable components
    * **molecules** - Mid level reuseable components, typically comprising over 3-5 atomic components
    * **organisims** - High level reuseable components, typically comprising over 3+ molecular components
    * **screens** - Physical screens rendered by the navigator
  * **context** - Context Providers
  * **data** - Data manipulation, typically tied closely to Models
  * **models** - Data models such as Interfaces and Types
  * **requests** - API Request Functions
    * **responses** - Axios Request Wrappers to make marshalling data easier
  * **utils** - Utility files/functions
  * **Navigation.tsx** - React Navigation mappings
  * **Theme.tsx** - NativeBase Theme Wrapper
* **App.tsx** - Main Entrypoint for the JavaScript code to be initialized  

### Getting Started
**These instructions assume you have Xcode, CocoaPods, and Android Studio installed and up-to-date.**
1. Clone the repository with `git clone git@github.com:Training-Club/tc-client.git`
2. Install Node.js Dependencies with `yarn install`
3. Change directory in to the iOS directory with `cd ios`
4. Install CocoaPods with `pod install`
5. Change back to the main directory with `cd ..`
6. Run iOS with `npx react-native run-ios` and Android with `npx react-native run-android`
    
