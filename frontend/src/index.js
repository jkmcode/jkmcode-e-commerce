import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./bootstrap.min.css";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

import store from "./store";
import "./index.css";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)

  .init({
    resources: {
      en: {
        translation: {
          latest_products: "Latest Products",

          Header_btn_cart: "cart",
          Header_navdrodown_profile: "Profile",
          Header_navdrodown_user_order: "Orders",
          Header_navdrodown_logout: "Logout",
          Header_navdrodown_user: "Users",
          Header_navdrodown_products: "Products",
          Header_navdrodown_orders: "Orders",
          Header_navdrodown_admin: "Admin",

          Admin_userlist_btn: "Users",
          Admin_productlist_btn: "Products",
          Admin_orderlist_btn: "Orders",

          SearchBox_placeholder: "Search product...",

          Product_reviews: "number of reviews",

          UserListScreen_list_of_users: "List of users",
          UserListScreen_table_name: "NAME",

          UserEditScreen_btn_go_back: "Go back",
          UserEditScreen_btn_update: "Update",
          UserEditScreen_edit_user: "EDIT USER",
          UserListScreen_form_label_name: "Name",
          UserListScreen_form_label_admin: "Admin",

          ProductScreen_btn_go_back: "GO BACK",
          ProductScreen_btn_add_to_cart: "ADD TO CART",
          ProductScreen_no_reviews: "No reviews",
          ProductScreen_review_submitted: "Review Submitted",
          ProductScreen_product_already_reviewed:
            "You can add only one comment and one review for product",
          ProductScreen_btn_form_submit: "SUBMIT",
          ProductScreen_price: "Price",
          ProductScreen_description: "Description",
          ProductScreen_status: "Status",
          ProductScreen_status_in_stock: "In Stock",
          ProductScreen_status_out_of_stock: "Out of Stock",
          ProductScreen_status_no_description: "No description",
          ProductScreen_qty: "Number of products in stock",
          ProductScreen_reviews: "REVIEWS",
          ProductScreen_write_a_review: "WRITE A REVIEW",
          ProductScreen_rating: "Rating",
          ProductScreen_form_review_selector: "Select...",
          ProductScreen_form_review_poor: "1 - Poor",
          ProductScreen_form_review_fair: "2 - Fair",
          ProductScreen_form_review_good: "3 - Good",
          ProductScreen_form_review_very_good: "4 - Very good",
          ProductScreen_form_review_excellent: "5 - Excellent",
          ProductScreen_form_review_comment: "Comment",

          CartScreen_btn_go_back: "Go back",
          CartScreen_proceed_to_checkout: "PROCEED TO CHECKOUT",
          CartScreen_title: "SHOPPING CART",
          CartScreen_empty_cart_message: "Your cart is empty",
          CartScreen_empty_subtotal_items: "SUBTOTAL ITEMS",

          CheckoutSteps_login: "LOGIN",
          CheckoutSteps_shipping: "SHIPPING",
          CheckoutSteps_payments: "PAYMENTS",
          CheckoutSteps_place_order: "PLACE ORDER",

          ShippingScreen_btn_country: "CONTINUE",
          ShippingScreen_title: "SHIPPING",
          ShippingScreen_btn_address: "Address",
          ShippingScreen_btn_city: "City",
          ShippingScreen_postal_code: "Postal Code",
          ShippingScreen_country: "Country",

          PaymentScreen_title: "Select Method",
          PaymentScreen_btn_country: "CONTINUE",

          PlaceOrderScreen_title_shipping: "SHIPPING",
          PlaceOrderScreen_shipping: "Address",
          PlaceOrderScreen_title_payment_method: "PAYMENT METHOD",
          PlaceOrderScreen_payment_method: "Method",
          PlaceOrderScreen_title_orders_items: "ORDER ITEMS",
          PlaceOrderScreen_empty_cart: "Your cart is empty",
          PlaceOrderScreen_table_title_order_summary: "ORDER SUMMARY",
          PlaceOrderScreen_table_items: "Items",
          PlaceOrderScreen_table_shipping: "Shipping",
          PlaceOrderScreen_table_tax: "Tax",
          PlaceOrderScreen_table_total: "Total",
          PlaceOrderScreen_btn: "PLACE ORDER",

          OrderScreen_title_shipping: "SHIPPING",
          OrderScreen_shipping_name: "Name",
          OrderScreen_shipping_shipping: "Shipping",
          OrderScreen_title_shipping_shipping: "Shipping",
          OrderScreen_message_not_delivered: "Not Delivered",
          OrderScreen_message_delivered_on: "Delivered on",
          OrderScreen_message_delivered_on_time: "Time",
          OrderScreen_title_payment_method: "PAYMENT METHOD",
          OrderScreen_payment_method: "Method",
          OrderScreen_message_not_paid: "Not paid",
          OrderScreen_message_paid_on: "paid on",
          OrderScreen_title_order_items: "ORDERS ITEMS",
          OrderScreen_table_title_order_summary: "ORDER SUMMARY",
          OrderScreen_table_items: "Items",
          OrderScreen_table_shipping: "Shipping",
          OrderScreen_table_tax: "Tax",
          OrderScreen_table_total: "Total",

          ProductListScreen_title_products: "LIST OF PRODUCTS",
          ProductListScreen_btn_create_product: "CREATE PRODUCT",
          ProductListScreen_table_name: "NAME",
          ProductListScreen_table_price: "PRICE",
          ProductListScreen_table_category: "CATEGORY",
          ProductListScreen_table_brand: "BRAND",

          "Image was uploaded": "Image was uploaded",
          "Images was uploaded": "Images was uploaded",
          ProductsEditScreen_btn_go_back: "Go back",
          ProductsEditScreen_btn_choose_photo: "Choose photo",
          ProductsEditScreen_btn_choose_more_photos: "More photos",
          ProductsEditScreen_btn_update: "Update",
          ProductsEditScreen_title_edit_product: "EDIT PRODUCT",
          ProductsEditScreen_table_name: "NAME",
          ProductsEditScreen_table_price: "PRICE",
          ProductsEditScreen_table_image: " MAIN IMAGE",
          ProductsEditScreen_table_brand: "BRAND",
          ProductsEditScreen_table_stock: "STOCK",
          ProductsEditScreen_table_category: "CATOGORY",
          ProductsEditScreen_table_description: "DESCRIPTION",

          OrderListScreen_title_orders: "ORDERS",
          OrderListScreen_table_btn_details: "DETAILS",
          OrderListScreen_table_user: "USER",
          OrderListScreen_table_date: "DATE",
          OrderListScreen_table_total: "TOTAL",
          OrderListScreen_table_paid: "PAID",
          OrderListScreen_table_delivered: "DELIVERED",

          ProfileScreen_btn_table_delivered: "ZOBACZ",
          ProfileScreen_btn_update: "UPDATE",
          ProfileScreen_update_form_title: "UPDATE DATA",
          ProfileScreen_update_form_name: "Name",
          ProfileScreen_update_form_name_placeholder: "Enter name",
          ProfileScreen_update_form_email_placeholder: "Enter email",
          ProfileScreen_update_form_password: "Password",
          ProfileScreen_update_form_password_placeholder: "Enter password",
          ProfileScreen_update_form_confirm_password: "Confirm password",
          ProfileScreen_update_form_confirm_password_placeholder:
            "Potwierd?? has??o",

          ProfileScreen_required_error_msg_name: "Name is required",
          ProfileScreen_minlength_error_msg_name:
            "Username must be at least 2 letters long",
          ProfileScreen_only_letters_error_msg_name: "Only letters can be used",
          ProfileScreen_required_error_msg_email: "Field is required",
          ProfileScreen_inproper_pattern_email: "Invalid email format",
          ProfileScreen_required_error_msg_password: "Field is required",
          ProfileScreen_minlength_error_msg_password:
            "Password must be at least 8 characters long",

          ProfileScreen_table_orders_title: "MY ORDERS",
          ProfileScreen_table_data: "DATE",
          ProfileScreen_table_total: "TOTAL",
          ProfileScreen_table_paid: "PAID",
          ProfileScreen_table_delivered: "DELIVERED",

          LoginScreen_btn_form: "SIGN IN",
          LoginScreen_title: "SIGN IN",
          LoginScreen_form_email_placeholder: "Enter emial",
          LoginScreen_form_password: "Password",
          LoginScreen_form_password_placeholder: "Password",
          LoginScreen_new_customer: "New Customer?",
          LoginScreen_password_reset_forgot_password: "Forgot password?",
          LoginScreen_register: "Register",
          LoginScreen_password_reset: "Reset password",
          LoginScreen_required_error_msg_email: "Field is required",
          LoginScreen_inproper_pattern_email: "Invalid email format",
          LoginScreen_required_error_msg_password: "Field is required",
          LoginScreen_minlength_error_msg_password:
            "The password must be at least 8 characters long",
          LoginScreen_Error_msg: "email or password is incorrect",

          "No active account found with the given credentials":
            "No active account found with the given credentials",

          RegisterScreen_btn_register: "REGISTER",
          RegisterScreen_title: "REGISTER",
          RegisterScreen_form_name: "Name",
          RegisterScreen_form_name_placeholder: "Enter name",
          RegisterScreen_form_email_placeholder: "Enter emial",
          RegisterScreen_form_password: "Password",
          RegisterScreen_form_password_placeholder: "Enter password",
          RegisterScreen_from_confirm_password: "Confirm password",
          RegisterScreen_form_confirm_password_placeholder: "Confirm password",
          RegisterScreen_have_an_account: "Have an Account?",
          RegisterScreen_sign_in: "Sign In",

          RegisterScreen_required_error_msg_name: "Name is required",
          RegisterScreen_minlength_error_msg_name:
            "Username must be at least 2 letters long",
          RegisterScreen_only_letters_error_msg_name:
            "Only letters can be used",
          RegisterScreen_required_error_msg_email: "Field is required",
          RegisterScreen_inproper_pattern_email: "Invalid email format",
          RegisterScreen_required_error_msg_password: "Field is required",
          RegisterScreen_minlength_error_msg_password:
            "Password must be at least 8 characters long",

          "User with this email already exists":
            "User with this email already exists",

          create_user_info:
            "Email has been sent. Please click to the link in order to activate user account.",

          Error_500_MSG:
            "Server error or no internet access. Check your internet connection and run the application again.",
          Error_Other_MSG: "Connection error",

          Error_404_MSG: "No connection to the server",
          Error_Account_Not_Found: "Login or password is incorrect",
          Error_400_MSG: "e-mail already exists",
          Error_password_does_not_match: "Password does not match",
        },
      },

      pl: {
        translation: {
          latest_products: "Najnowsze produkty",

          Header_btn_cart: "koszyk",
          Header_navdrodown_profile: "Profil",
          Header_navdrodown_user_order: "Zam??wienia",
          Header_navdrodown_logout: "Wyloguj",
          Header_navdrodown_user: "U??ytkownicy",
          Header_navdrodown_products: "Produkty",
          Header_navdrodown_orders: "Zam??wienia",
          Header_navdrodown_admin: "Administrator",

          Admin_userlist_btn: "U??ytkownicy",
          Admin_productlist_btn: "Produkty",
          Admin_orderlist_btn: "Zam??wienia",

          SearchBox_placeholder: "Znajd?? produkt...",

          Product_reviews: "liczba opini",

          UserListScreen_list_of_users: "Lista u??ytkownik??w",
          UserListScreen_table_name: "NAZWA",

          UserEditScreen_btn_go_back: "Wstecz",
          UserEditScreen_btn_update: "Zmie??",
          UserEditScreen_edit_user: "EDYCJA U??YTKOWNIKA",
          UserListScreen_form_label_name: "Nazwa",
          UserListScreen_form_label_admin: "Administrator",

          ProductScreen_btn_go_back: "Wstecz",
          ProductScreen_btn_add_to_cart: "DODAJ DO KOSZYKA",
          ProductScreen_no_reviews: "Brak opini",
          ProductScreen_review_submitted: "Komentarz dodany",
          ProductScreen_product_already_reviewed:
            "Mo??na doda?? tylko jedn?? ocen?? oraz jeden komentarz",
          ProductScreen_btn_form_submit: "OPUBLIKUJ",
          ProductScreen_price: "Cena",
          ProductScreen_description: "Opis",
          ProductScreen_status: "Status",
          ProductScreen_status_in_stock: "W magazynie",
          ProductScreen_status_out_of_stock: "Brak produktu w magazynie",
          ProductScreen_status_no_description: "Brak opisu",
          ProductScreen_qty: "Ilo???? sztuk w magazynie",
          ProductScreen_reviews: "OPINIE",
          ProductScreen_write_a_review: "NAPISZ OPINIE",
          ProductScreen_rating: "Ocena",
          ProductScreen_form_review_selector: "Wybierz...",
          ProductScreen_form_review_poor: "1 - Bradzo s??abo",
          ProductScreen_form_review_fair: "2 - S??abo",
          ProductScreen_form_review_good: "3 - Przeci??tnie",
          ProductScreen_form_review_very_good: "4 - Dobrze",
          ProductScreen_form_review_excellent: "5 - Bardzo dobrze",
          ProductScreen_form_review_comment: "Komentarz",

          CartScreen_btn_go_back: "Wstecz",
          CartScreen_proceed_to_checkout: "PRZEJ?? DO KASY",
          CartScreen_title: "TWOJE ZAKUPY",
          CartScreen_empty_cart_message: "Brak wbranych produkt??w",
          CartScreen_empty_subtotal_items: "ILO???? WYBRANYCH PRODUKT??W",

          CheckoutSteps_login: "LOGIN",
          CheckoutSteps_shipping: "ADRES",
          CheckoutSteps_payments: "P??ATNO??CI",
          CheckoutSteps_place_order: "ZAM??WIENIE",

          ShippingScreen_btn_country: "KONTYNUUJ",
          ShippingScreen_title: "ADRES DO WYSY??KI",
          ShippingScreen_btn_address: "Ulica, nr. budynku",
          ShippingScreen_btn_city: "Miasto",
          ShippingScreen_postal_code: "Kod pocztowy",
          ShippingScreen_country: "Pa??stwo",

          PaymentScreen_title: "Wybierz forme p??atno??ci",
          PaymentScreen_btn_country: "KONTYNUUJ",

          PlaceOrderScreen_title_shipping: "ADRES WYSY??KI",
          PlaceOrderScreen_shipping: "Adres",
          PlaceOrderScreen_title_payment_method: "METODA P??ATNO??CI",
          PlaceOrderScreen_payment_method: "Metoda p??atno??ci",
          PlaceOrderScreen_title_orders_items: "MOJE ZAKUPY",
          PlaceOrderScreen_empty_cart: "Brak wybranych produkt??w",
          PlaceOrderScreen_table_title_order_summary: "PODSUMOWANIE ZAM??WIENIA",
          PlaceOrderScreen_table_items: "Produkty",
          PlaceOrderScreen_table_shipping: "Wysy??ka",
          PlaceOrderScreen_table_tax: "Podatek",
          PlaceOrderScreen_table_total: "Suma",
          PlaceOrderScreen_btn: "ZAMAWIAM",

          OrderScreen_title_shipping: "INFORMACJE OG??LNE",
          OrderScreen_shipping_name: "Nazwa u??ytkownika",
          OrderScreen_shipping_shipping: "Adres",
          OrderScreen_message_not_delivered: "Nie dostarczono",
          OrderScreen_message_delivered_on: "Dostarczono",
          OrderScreen_message_delivered_on_time: "Godzina",
          OrderScreen_title_payment_method: "METODA P??ATNO??CI",
          OrderScreen_payment_method: "Metoda",
          OrderScreen_message_not_paid: "Nie zap??acone",
          OrderScreen_message_paid_on: "Transacja zosta??a zrealizowana",
          OrderScreen_title_order_items: "LISTA ZAM??WIE??",
          OrderScreen_table_title_order_summary: "PODSUMOWANIE ZAM??WIENIA",
          OrderScreen_table_items: "Produkty",
          OrderScreen_table_shipping: "Wysy??ka",
          OrderScreen_table_tax: "Podatek",
          OrderScreen_table_total: "Suma",

          ProductListScreen_title_products: "LISTA PRODUKT??W",
          ProductListScreen_btn_create_product: "DODAJ PRODUKT",
          ProductListScreen_table_name: "NAZWA",
          ProductListScreen_table_price: "CENA",
          ProductListScreen_table_category: "KATEGORIA",
          ProductListScreen_table_brand: "MARKA",

          "Image was uploaded": "Zdj??cie zosta??o zmienione",
          "Images was uploaded": "Zdj??ciea zosta??y zmienione",
          ProductsEditScreen_btn_choose_photo: "Wybierz zdj??cie",
          ProductsEditScreen_btn_choose_more_photos: "Wi??cej zdj????",
          ProductsEditScreen_btn_update: "Zmie??",
          ProductsEditScreen_title_edit_product: "EDYCJA PRODUKTU",
          ProductsEditScreen_table_name: "NAZWA",
          ProductsEditScreen_table_price: "CENA",
          ProductsEditScreen_table_image: "ZDJ??CIE PODSTAWOWE",
          ProductsEditScreen_table_brand: "MARKA",
          ProductsEditScreen_table_stock: "ILO???? SZTUK W MAGAZYNIE",
          ProductsEditScreen_table_category: "KATEGORIA",
          ProductsEditScreen_table_description: "OPIS",

          OrderListScreen_title_orders: "ZAM??WIENIA",
          OrderListScreen_table_btn_details: "ZOBACZ",
          OrderListScreen_table_user: "U??YTKOWNIK",
          OrderListScreen_table_date: "DATA",
          OrderListScreen_table_total: "SUMA",
          OrderListScreen_table_paid: "ZAP??ACONE",
          OrderListScreen_table_delivered: "DOSTARCZONE",

          ProfileScreen_btn_update: "Zmie??",
          ProfileScreen_btn_table_delivered: "ZOBACZ",
          ProfileScreen_update_form_title: "ZMIE?? DANE",
          ProfileScreen_update_form_name: "Nazwa u??ytkownika",
          ProfileScreen_update_form_name_placeholder:
            "Wprowad?? nazw?? u??ytkownika",
          ProfileScreen_update_form_email_placeholder: "Wprowad?? email",
          ProfileScreen_update_form_password: "Has??o",
          ProfileScreen_update_form_password_placeholder: "Wprowad?? has??o",
          ProfileScreen_update_form_confirm_password: "Potwierd?? has??o",
          ProfileScreen_update_form_confirm_password_placeholder:
            "Potwierd?? has??o",
          ProfileScreen_table_orders_title: "MOJE ZAM??WIENIA",
          ProfileScreen_table_data: "DATA",
          ProfileScreen_table_total: "SUMA",
          ProfileScreen_table_paid: "ZAP??ACONE",
          ProfileScreen_table_delivered: "DOSTARCZONE",

          ProfileScreen_required_error_msg_name:
            "Nazwa u??ytkownika jest wymagana",
          ProfileScreen_minlength_error_msg_name:
            "Nazwa u??ytkownika musi sk??ada?? si?? przynajmniej z 2 liter",
          ProfileScreen_only_letters_error_msg_name: "Mo??na u??ywa?? tylko liter",
          ProfileScreen_required_error_msg_email: "Pole jest wymagane",
          ProfileScreen_inproper_pattern_email: "Niepoprawny format email",
          ProfileScreen_required_error_msg_password: "Pole jest wymagane",
          ProfileScreen_minlength_error_msg_password:
            "Has??o musi mie?? co najmniej 8 znak??w",

          LoginScreen_btn_form: "ZALOGUJ SI??",
          LoginScreen_title: "LOGOWANIE",
          LoginScreen_form_email_placeholder: "Wpisz Email",
          LoginScreen_form_password: "Has??o",
          LoginScreen_form_password_placeholder: "Wpisz has??o",
          LoginScreen_new_customer: "Nie masz konta?",
          LoginScreen_register: "Zarejestruj si??",
          LoginScreen_password_reset: "Zmie?? has??o",
          LoginScreen_password_reset_forgot_password: "Zapomnia??e?? has??a?",
          LoginScreen_required_error_msg_email: "Pole wymagane",
          LoginScreen_inproper_pattern_email: "Nieprawid??owy format email",
          LoginScreen_required_error_msg_password: "Pole wymagane",
          LoginScreen_minlength_error_msg_password:
            "Has??o musi si?? sk??ada?? z minimum 8 znak??w",
          LoginScreen_Error_msg: "email lub has??o jest niepoprawne",

          "No active account found with the given credentials":
            "Nie znaleziono aktywnego konta z podanymi danymi uwierzytelniaj??cymi",

          RegisterScreen_btn_register: "ZAREJESTRUJ SI??",
          RegisterScreen_title: "UTW??RZ KONTO",
          RegisterScreen_form_name: "Nazwa u??ytkownika",
          RegisterScreen_form_name_placeholder: "Wprowad?? nazwe u??ytkownika",
          RegisterScreen_form_email_placeholder: "Wprowad?? emial",
          RegisterScreen_form_password: "Has??o",
          RegisterScreen_form_password_placeholder: "Wprowad?? has??o",
          RegisterScreen_from_confirm_password: "Powierd?? has??o",
          RegisterScreen_form_confirm_password_placeholder: "Potwierd?? has??o",
          RegisterScreen_have_an_account: "Masz ju?? konto?",
          RegisterScreen_sign_in: "Zaloguj si??",

          RegisterScreen_required_error_msg_name:
            "Nazwa u??ytkownika jest wymagana",
          RegisterScreen_minlength_error_msg_name:
            "Nazwa u??ytkownika musi sk??ada?? si?? przynajmniej z 2 liter",
          RegisterScreen_only_letters_error_msg_name:
            "Mo??na u??ywa?? tylko liter",
          RegisterScreen_required_error_msg_email: "Pole jest wymagane",
          RegisterScreen_inproper_pattern_email: "Niepoprawny format email",
          RegisterScreen_required_error_msg_password: "Pole jest wymagane",
          RegisterScreen_minlength_error_msg_password:
            "Has??o musi mie?? co najmniej 8 znak??w",

          "User with this email already exists":
            "U??ytkownik z tym adresem email ju?? istnieje",
          "Password do not match": "Podane has??a nie s?? takie same",
          create_user_info:
            "Email zosta?? wys??any. Kliknij w link, aby aktywowa?? konto u??ytkownika.",
          Error_500_MSG:
            "B????d serwera lub brak dost??pu do Internetu. Sprawd?? po????czenie internetowe i ponownie uruchom aplikacj??.",
          Error_Other_MSG: "B????d sieciowy",
          Error_404_MSG: "Brak po????czenia z serwerem",
          Error_Account_Not_Found: "Login lub has??o jest nieprawid??owe",
          Error_400_MSG: "Podany email ju?? istnieje",
          Error_password_does_not_match: "Podane has??a s?? nieprawid??owe",
        },
      },
    },

    fallbackLng: "en",
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/translation/{{lng}}.json",
    },
  });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
