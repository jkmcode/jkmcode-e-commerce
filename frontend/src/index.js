import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./bootstrap.min.css";

//import 'bootstrap/dist/css/bootstrap.min.css'
//import 'bootstrap/dist/js/bootstrap.js'

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
  // .init({
  //   supportedLngs: ["en", "pl"],
  //   fallbackLng: "en",
  //   detection: {
  //     order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
  //     caches: ["cookie"],
  //   },
  //   backend: {
  //     loadPath: "/translation/{{lng}}.json",
  //   },
  //   react: { useSuspense: false },
  // });

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

          CheckoutSteps_login: "LOGOWANIE",
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
            "Potwierdź hasło",

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
          "Password do not match": "Password do not match",

          create_user_info:
            "Email has been sent. Please click to the link in order to activate user account.",
        },
      },

      pl: {
        translation: {
          latest_products: "Najnowsze produkty",

          Header_btn_cart: "koszyk",
          Header_navdrodown_profile: "Profil",
          Header_navdrodown_user_order: "Zamówienia",
          Header_navdrodown_logout: "Wyloguj",
          Header_navdrodown_user: "Użytkownicy",
          Header_navdrodown_products: "Produkty",
          Header_navdrodown_orders: "Zamówienia",
          Header_navdrodown_admin: "Administrator",

          Admin_userlist_btn: "Użytkownicy",
          Admin_productlist_btn: "Produkty",
          Admin_orderlist_btn: "Zamówienia",

          SearchBox_placeholder: "Znajdź produkt...",

          Product_reviews: "liczba opini",

          UserListScreen_list_of_users: "Lista użytkowników",
          UserListScreen_table_name: "NAZWA",

          UserEditScreen_btn_go_back: "Wstecz",
          UserEditScreen_btn_update: "Zmień",
          UserEditScreen_edit_user: "EDYCJA UŻYTKOWNIKA",
          UserListScreen_form_label_name: "Nazwa",
          UserListScreen_form_label_admin: "Administrator",

          ProductScreen_btn_go_back: "Wstecz",
          ProductScreen_btn_add_to_cart: "DODAJ DO KOSZYKA",
          ProductScreen_no_reviews: "Brak opini",
          ProductScreen_review_submitted: "Komentarz dodany",
          ProductScreen_product_already_reviewed:
            "Można dodać tylko jedną ocenę oraz jeden komentarz",
          ProductScreen_btn_form_submit: "OPUBLIKUJ",
          ProductScreen_price: "Cena",
          ProductScreen_description: "Opis",
          ProductScreen_status: "Status",
          ProductScreen_status_in_stock: "W magazynie",
          ProductScreen_status_out_of_stock: "Brak produktu w magazynie",
          ProductScreen_status_no_description: "Brak opisu",
          ProductScreen_qty: "Ilość sztuk w magazynie",
          ProductScreen_reviews: "OPINIE",
          ProductScreen_write_a_review: "NAPISZ OPINIE",
          ProductScreen_rating: "Ocena",
          ProductScreen_form_review_selector: "Wybierz...",
          ProductScreen_form_review_poor: "1 - Bradzo słabo",
          ProductScreen_form_review_fair: "2 - Słabo",
          ProductScreen_form_review_good: "3 - Przeciętnie",
          ProductScreen_form_review_very_good: "4 - Dobrze",
          ProductScreen_form_review_excellent: "5 - Bardzo dobrze",
          ProductScreen_form_review_comment: "Komentarz",

          CartScreen_btn_go_back: "Wstecz",
          CartScreen_proceed_to_checkout: "PRZEJĆ DO KASY",
          CartScreen_title: "TWOJE ZAKUPY",
          CartScreen_empty_cart_message: "Brak wbranych produktów",
          CartScreen_empty_subtotal_items: "ILOŚĆ WYBRANYCH PRODUKTÓW",

          CheckoutSteps_login: "LOGIN",
          CheckoutSteps_shipping: "ADRES",
          CheckoutSteps_payments: "PŁATNOŚCI",
          CheckoutSteps_place_order: "ZŁOŻENIE ZAMÓWIENIA",

          ShippingScreen_btn_country: "KONTYNUUJ",
          ShippingScreen_title: "ADRES DO WYSYŁKI",
          ShippingScreen_btn_address: "Ulica, nr. budynku",
          ShippingScreen_btn_city: "Miasto",
          ShippingScreen_postal_code: "Kod pocztowy",
          ShippingScreen_country: "Państwo",

          PaymentScreen_title: "Wybierz forme płatności",
          PaymentScreen_btn_country: "KONTYNUUJ",

          PlaceOrderScreen_title_shipping: "ADRES WYSYŁKI",
          PlaceOrderScreen_shipping: "Adres",
          PlaceOrderScreen_title_payment_method: "METODA PŁATNOŚCI",
          PlaceOrderScreen_payment_method: "Metoda płatności",
          PlaceOrderScreen_title_orders_items: "MOJE ZAKUPY",
          PlaceOrderScreen_empty_cart: "Brak wybranych produktów",
          PlaceOrderScreen_table_title_order_summary: "PODSUMOWANIE ZAMÓWIENIA",
          PlaceOrderScreen_table_items: "Produkty",
          PlaceOrderScreen_table_shipping: "Wysyłka",
          PlaceOrderScreen_table_tax: "Podatek",
          PlaceOrderScreen_table_total: "Suma",
          PlaceOrderScreen_btn: "ZAMAWIAM",

          OrderScreen_title_shipping: "INFORMACJE OGÓLNE",
          OrderScreen_shipping_name: "Nazwa użytkownika",
          OrderScreen_shipping_shipping: "Adres",
          OrderScreen_message_not_delivered: "Nie dostarczono",
          OrderScreen_message_delivered_on: "Dostarczono",
          OrderScreen_message_delivered_on_time: "Godzina",
          OrderScreen_title_payment_method: "METODA PŁATNOŚCI",
          OrderScreen_payment_method: "Metoda",
          OrderScreen_message_not_paid: "Nie zapłacone",
          OrderScreen_message_paid_on: "Transacja została zrealizowana",
          OrderScreen_title_order_items: "LISTA ZAMÓWIEŃ",
          OrderScreen_table_title_order_summary: "PODSUMOWANIE ZAMÓWIENIA",
          OrderScreen_table_items: "Produkty",
          OrderScreen_table_shipping: "Wysyłka",
          OrderScreen_table_tax: "Podatek",
          OrderScreen_table_total: "Suma",

          ProductListScreen_title_products: "LISTA PRODUKTÓW",
          ProductListScreen_btn_create_product: "DODAJ PRODUKT",
          ProductListScreen_table_name: "NAZWA",
          ProductListScreen_table_price: "CENA",
          ProductListScreen_table_category: "KATEGORIA",
          ProductListScreen_table_brand: "MARKA",

          "Image was uploaded": "Zdjęcie zostało zmienione",
          "Images was uploaded": "Zdjęciea zostały zmienione",
          ProductsEditScreen_btn_choose_photo: "Wybierz zdjęcie",
          ProductsEditScreen_btn_choose_more_photos: "Więcej zdjęć",
          ProductsEditScreen_btn_update: "Zmień",
          ProductsEditScreen_title_edit_product: "EDYCJA PRODUKTU",
          ProductsEditScreen_table_name: "NAZWA",
          ProductsEditScreen_table_price: "CENA",
          ProductsEditScreen_table_image: "ZDJĘCIE PODSTAWOWE",
          ProductsEditScreen_table_brand: "MARKA",
          ProductsEditScreen_table_stock: "ILOŚĆ SZTUK W MAGAZYNIE",
          ProductsEditScreen_table_category: "KATEGORIA",
          ProductsEditScreen_table_description: "OPIS",

          OrderListScreen_title_orders: "ZAMÓWIENIA",
          OrderListScreen_table_btn_details: "ZOBACZ",
          OrderListScreen_table_user: "UŻYTKOWNIK",
          OrderListScreen_table_date: "DATA",
          OrderListScreen_table_total: "SUMA",
          OrderListScreen_table_paid: "ZAPŁACONE",
          OrderListScreen_table_delivered: "DOSTARCZONE",

          ProfileScreen_btn_update: "Zmień",
          ProfileScreen_btn_table_delivered: "ZOBACZ",
          ProfileScreen_update_form_title: "ZMIEŃ DANE",
          ProfileScreen_update_form_name: "Nazwa użytkownika",
          ProfileScreen_update_form_name_placeholder:
            "Wprowadź nazwę użytkownika",
          ProfileScreen_update_form_email_placeholder: "Wprowadź email",
          ProfileScreen_update_form_password: "Hasło",
          ProfileScreen_update_form_password_placeholder: "Wprowadź hasło",
          ProfileScreen_update_form_confirm_password: "Potwierdź hasło",
          ProfileScreen_update_form_confirm_password_placeholder:
            "Potwierdź hasło",
          ProfileScreen_table_orders_title: "MOJE ZAMÓWIENIA",
          ProfileScreen_table_data: "DATA",
          ProfileScreen_table_total: "SUMA",
          ProfileScreen_table_paid: "ZAPŁACONE",
          ProfileScreen_table_delivered: "DOSTARCZONE",

          ProfileScreen_required_error_msg_name:
            "Nazwa użytkownika jest wymagana",
          ProfileScreen_minlength_error_msg_name:
            "Nazwa użytkownika musi składać się przynajmniej z 2 liter",
          ProfileScreen_only_letters_error_msg_name: "Można używać tylko liter",
          ProfileScreen_required_error_msg_email: "Pole jest wymagane",
          ProfileScreen_inproper_pattern_email: "Niepoprawny format email",
          ProfileScreen_required_error_msg_password: "Pole jest wymagane",
          ProfileScreen_minlength_error_msg_password:
            "Hasło musi mieć co najmniej 8 znaków",

          LoginScreen_btn_form: "ZALOGUJ SIĘ",
          LoginScreen_title: "LOGOWANIE",
          LoginScreen_form_email_placeholder: "Wpisz Email",
          LoginScreen_form_password: "Hasło",
          LoginScreen_form_password_placeholder: "Wpisz hasło",
          LoginScreen_new_customer: "Nie masz konta?",
          LoginScreen_register: "Zarejestruj się",
          LoginScreen_password_reset: "Zmień hasło",
          LoginScreen_password_reset_forgot_password: "Zapomniałeś hasła?",
          LoginScreen_required_error_msg_email: "Pole wymagane",
          LoginScreen_inproper_pattern_email: "Nieprawidłowy format email",
          LoginScreen_required_error_msg_password: "Pole wymagane",
          LoginScreen_minlength_error_msg_password:
            "Hasło musi się składać z minimum 8 znaków",
          LoginScreen_Error_msg: "email lub hasło jest niepoprawne",

          "No active account found with the given credentials":
            "Nie znaleziono aktywnego konta z podanymi danymi uwierzytelniającymi",

          RegisterScreen_btn_register: "ZAREJESTRUJ SIĘ",
          RegisterScreen_title: "UTWÓRZ KONTO",
          RegisterScreen_form_name: "Nazwa użytkownika",
          RegisterScreen_form_name_placeholder: "Wprowadź nazwe użytkownika",
          RegisterScreen_form_email_placeholder: "Wprowadź emial",
          RegisterScreen_form_password: "Hasło",
          RegisterScreen_form_password_placeholder: "Wprowadź hasło",
          RegisterScreen_from_confirm_password: "Powierdź hasło",
          RegisterScreen_form_confirm_password_placeholder: "Potwierdź hasło",
          RegisterScreen_have_an_account: "Masz już konto?",
          RegisterScreen_sign_in: "Zaloguj się",

          RegisterScreen_required_error_msg_name:
            "Nazwa użytkownika jest wymagana",
          RegisterScreen_minlength_error_msg_name:
            "Nazwa użytkownika musi składać się przynajmniej z 2 liter",
          RegisterScreen_only_letters_error_msg_name:
            "Można używać tylko liter",
          RegisterScreen_required_error_msg_email: "Pole jest wymagane",
          RegisterScreen_inproper_pattern_email: "Niepoprawny format email",
          RegisterScreen_required_error_msg_password: "Pole jest wymagane",
          RegisterScreen_minlength_error_msg_password:
            "Hasło musi mieć co najmniej 8 znaków",

          "User with this email already exists":
            "Użytkownik z tym adresem email już istnieje",
          "Password do not match": "Podane hasła nie są takie same",
          create_user_info:
            "Email został wysłany. Kliknij w link, aby aktywować konto użytkownika.",
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
