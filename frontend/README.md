# Project Title

JKM E-COMMERCE

## Demo link:

Access my site at : (empty)

## About The App

### General information

JKM E-COMMERCE contains all features which allows you to buy product and pay by Paypal or by cash.

Thanks to Admin panel you can manage sales strategies to achive best result. For example you can add, remove or edit your products without limits. Moreover you can establish amount of product.

Additiocally customers can evaluate pruducts. Those which has the hightest ratings are on top products carousel treted as a bestseller.

Admin has a access to the all user accounts to manage them and has a overview on user's orders.

JKM E-COMMERCE is written in polish and english language.

## Technical stack

### Backend

- Django
- REST API
- Djoser (token authentication)
- Postgresql
- AWS

### Frontend

- React JS
- HTML 5
- CSS
- React bootstrap
- Axios
- Redux

## Technical approach

### Authentication

From the backend side Djoser library was used in order to create simple authentication system with functions like registration, login, logout, password reset and account activation. To registrate new account, user needs to fill simple form which includes email and password. After that, customer has to click on activation link from the email and click the button named 'activate'.

In order to reset password, user must type an e-mail to which an e-mail with a link will be sent. After clicking on link user will be redirected to the page where set new password will be possible.

### Authorisation

User without registration can:

- view product on the home page,
- adding to the the cart product and delete them,
- view details about each product (description, price, review etc.)

Logged user can:

- go to checkout proccess (type shipping and way of payments),
- go to the final page of the order,
- summary of the order (here you can pay using paypal and see you current status of your order in terms of delivery and payment),
- view of you account (to change credentials), orders.

Admin has a access to:

- all users account (he can delete and edit user),
- all product entered into shop (he can add, delete and edit product),
- view on all oreders (including archivated).

## Internacionalisaion

JKM E-COMMERCE is written in engilsh and polish language. Here i18n library and useTranslation hook was used.

### Themes

Go to the site and choose Lux theme : https://bootswatch.com/

### Payment

Paypal could be used thaks to react-paypal-button-v2 library.

### Store images

All images added by Admin are store on AWS S3 Bucked.

### Database

Database used in project is Postgresql which is on Heroku server (This is hobby version so has some limitation in terms of connection limits or limit in amount of tables. That's why some data can work with delay)

## Features

- Full featured shopping cart
- Product reviews and ratings
- Language switcher
- Image slider
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration

## Download & Setup Instructions

## PWA

Do Zrobienia:
Password reset (obsługa błedów),
PWA,
Zminiejszanie zdjęć,
wdrożenie na server Heroku,
Postgres,
AWS,
Nie wchodzi transalte po stronie Django (połowicznie ogarnięte xD )
