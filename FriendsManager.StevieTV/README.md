# Project - Friends Manager - React with Redux + .Net API

The goal of this project was to create an API to manage contact moments with different categories of friends, and then to create a front end react project using Redux for state management.


The project is part of TheCSharpAcademy: https://thecsharpacademy.com/project/38/friends-manager

### Requirements

*   In this app you'll keep data about the friendships you want to cultivate.
*   You can choose which properties you want to have in your "Friend" model, except that you need to have a "LastContactDate" and a "LastContactType" and a "Desired Contact Frequency" properties
*   You're also required to have a "Category" table, which will be linked to your "Friends" table by a foreign key.
*   Users should be able to easily visualize the friends that are getting the least attention (i.e. Last contact date has been longer than desired contact frequency)
*   When adding a new friend, the form should contain a dropdown with the Category.
*   You need to use Redux for state management.
*   You need to handle validation and server errors.

### Features of the project

*   Uses SQL Database
*   Allows addition and deletion of friends and categories
*   Uses Material UI for React for components and styling
*   Presents warning when contact is overdue
*   Used Redux Toolkit RTK for simplified state management and API calls

### Running

1. Update the connection string in `appsettings.json`
2. Run the FriendsManager project as https
3. Install the frontend dependencies: `npm install`
4. run the frontend `npm run dev`