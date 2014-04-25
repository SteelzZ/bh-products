# Blackhole - Products

Meteor package that adds products management functionality. This one of packages that belongs to [Blackhole](https://github.com/SteelzZ/blackhole) project.

## History

###### Current version - In Development, unstable

## About

Package responsible for products management. After install you will be able to create, remove and update products. Product model is flexible enough and you can add your own fields which can have their own JSON structure. 

Package also includes multi currency pricing for products. You will be able to define price schemas and then attach it to product. Price schema stores price per currency. This allows you to satisfy marketing needs to have so called market friendly prices for each required currency.

Along with pricing schemas you can define your own product types and attach to each type pricing option. Pricing option stores metadata/context about what this price is for. For example, pricing option can be "sale" or "subscription". 
Along with attached pricing schema to product you can define how often that amount should be captured or when you should start capturing payments. This package is not responsible for actual payment process, it just defines how it should be treated in package which will be doing that. 

So to sum up, after installation of this package you will:
 * be able to define multi currency prices for your products
 * be able to define market friendly prices per currency
 * be able to define your own pricing options per product
 * be able to create, update, remove and read products 
 * be able to customize product model (fields etc.)  

## Installation (NOT PUBLISHED YET)

Blackhole Products can be installed with [Meteorite](https://github.com/oortcloud/meteorite/). From inside a Meteorite-managed app:

``` sh
$ mrt add bh-products
```