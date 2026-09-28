# Table & Thyme — Restaurant App MVP

A React Native restaurant application built with Expo for the Mobile Application Development (MAD) course.

## Overview

Table & Thyme is a frontend restaurant application that allows customers to browse a menu, search and filter dishes, manage a cart, place demo orders, and request table reservations.

The application also includes a manager interface for viewing orders and reservations and making basic menu changes.

This project is a frontend MVP and uses local mock data and device storage rather than a production backend.

## Features

### Customer

* Login and signup
* Browse restaurant menu
* Search for dishes
* Filter dishes by category
* Sort menu items
* View daily specials
* View item availability
* Add and remove favourites
* Add items to cart
* Change item quantities
* Add notes to cart items
* Apply promotional codes
* Choose takeaway or dine-in
* Review order totals
* Place demo orders
* Track order status
* View order history
* Request table reservations
* View and cancel reservations
* Switch between light and dark themes

### Restaurant Manager

* View incoming orders
* Update order status
* View reservation requests
* Accept or decline reservations
* Add menu items
* Change menu prices
* Change item availability

## Technologies

* React Native
* Expo
* Expo Router
* JavaScript
* AsyncStorage
* React Context
* React Hooks

## Project Structure

```text
src/
├── components/
├── context/
├── data/
├── hooks/
├── navigation/
├── reducers/
├── screens/
└── theme/

A1/
├── SRS.md
├── SRS.pdf
└── UML/

assets/
```

## Getting Started

### Requirements

Make sure you have the following installed:

* Node.js
* npm
* Expo CLI or access to `npx expo`
* Expo Go on a physical Android/iOS device, or an Android/iOS emulator

### Install dependencies

From the project directory, run:

```bash
npm install
```

### Start the application

```bash
npx expo start
```

After Expo starts, the application can be opened using Expo Go on a physical device or through a compatible emulator.

## Demo Accounts

The application includes local demo accounts for testing the customer and manager flows.

Check `src/data/users.js` for the available demo credentials.

## Data and Storage

This MVP does not use a remote server or database.

The application uses:

* Local JavaScript data for the initial menu and demo users
* React Context and reducers for application state
* AsyncStorage for selected local data such as orders, reservations, and menu changes

The stored data is specific to the device running the application.

## Limitations

This is a frontend prototype and does not provide:

* Production authentication
* Server-side data storage
* Real payment processing
* Real-time multi-device synchronization
* Restaurant POS integration
* Push notifications
* Delivery tracking
* Production reservation management

Orders, reservations, and other application behavior are simulated locally for demonstration purposes.

## Assignment Documentation

The `A1` directory contains the Software Requirements Specification and UML diagrams associated with the project.

* `A1/SRS.md` — Software Requirements Specification
* `A1/SRS.pdf` — PDF version of the SRS
* `A1/UML/` — UML
