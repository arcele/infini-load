This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# infini-load component
This project contains a simple reusable react component to support infinite loading, with the App.jsx using an api from Portfolium as an example

## To Run In Development Mode
Clone this Repo
### `npm install`
### `npm start`

app will be available locally at http://localhost:3000


## To Build a Production Build
### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Component Usage

The `DataList` component takes in the following arguments:
- endPoint - url for the end point to pull data from
- limit - number of elements to pull at a time
- columns - array of objects representing the data to be pulled from the end point
  - header - Header text to display in the table
  - dataKey - key to use from the top level item, `.` can be used to go deeper into the object
  - asImage - if true an img with the returned value as the src is returned
  - sorts - array of string values that can be passed with a 'sort' param on the endPoint