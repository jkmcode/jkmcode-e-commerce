from django.urls import path
from django.urls.resolvers import URLPattern
from base.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name='products'),

    path('images/<str:pk>/', views.getProductImages, name='products-images'),

    path('create/', views.createProduct, name='product-create'),
    path('upload/', views.uploadImage, name='image-upload'),
    path('multiupload/', views.uploadMultiImages, name='image-multi-upload'),

    path('<str:pk>/reviews/', views.createProductReview, name='create-review'),
    path('top/',views.getTopProducts, name='top-products'),
    path('<str:pk>/', views.getProduct, name='product'),

    path('update/<str:pk>/', views.updateProduct, name='product-update'),
    path('delete/<str:pk>/', views.deleteProduct, name='product-delete'),
]