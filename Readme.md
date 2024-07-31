# Project Name
ManojSelvin-SuccessCriteriaApp

## Table of Contents

- [Project Description](#project-description)
- [APIs](#apis)
- [Postman Collection](#postman-collection)
- [Test Coverage](#test-coverage)

## Project Description

Project to demonstrate understanding of Node.js and be able to work on different tasks of success criteria.

## APIs

- **API 1: API Health Check**
  - Endpoint: `/api/health`
  - Method: `GET`
  - Description: Health check endpoint.

- **API 2: Greet API**
  - Endpoint: `/api/greet`
  - Method: `GET`
  - Description: Greeting API.

- **API 3: Employees API**
  - Endpoint: [/api/employees](cci:4://c:/Users/manoj.selvin/work/manojselvin-app/server.js:39:0-84:0)
  - Method: `GET`
  - Description: API to fetch employees.
  - Query Parameters:
    - `callType`: Specifies the type of API call. Possible values are `asyncAwait`, `promise`, and `callback`. Default is `asyncAwait`.

- **API 4: Add New Cars to our collection (Role Access: Only Admin)**
  - Endpoint: `/api/cars`
  - Method: `POST`
  - Description: API to add new cars to the collection.
  - Request Body:
    - `token`: The authentication token.

- **API 5: API to fetch cars (Role Access: All)**
  - Endpoint: `/api/cars`
  - Method: `GET`
  - Description: API to fetch cars.
  - Request Headers:
    - `Authorization`: The authentication token.

- **API 6: API to update a car (Role Access: Only Admin)**
  - Endpoint: `/api/cars/{id}`
  - Method: `PUT`
  - Description: API to update a car.
  - Path Parameters:
    - `id`: The ID of the car to update.
  - Request Body:
    - `token`: The authentication token.
  - Request Headers:
    - `Authorization`: The authentication token.

- **API 7: API to delete a car (Role Access: Only Admin)**
  - Endpoint: `/api/cars/{id}`
  - Method: `DELETE`
  - Description: API to delete a car.
  - Path Parameters:
    - `id`: The ID of the car to delete.
  - Request Headers:
    - `Authorization`: The authentication token.

## Postman Collection

Provide a link to your Postman collection, which can be imported into Postman to test the APIs.

[Postman Collection](./Success%20Criteria.postman_collection.json)

## Test Coverage percentage is 66.97%.
