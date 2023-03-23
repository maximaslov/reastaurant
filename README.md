# Restaurant
This is a demonstration single-page web application that represents a solution for managing a small restaurant. The application has an absolutely intuitive interface and is adapted to devices with screens of any size.

1)In the settings section, you can add, delete, and edit existing menus and prices, waiters, and tables. All changes are instantly sent to the server.
2)When creating a new bill, you can choose the waiter's name and a free table from the list. If an active bill is already assigned to a certain table, it cannot be selected (it works incorrectly in browsers on iOS).
3)The newly created bill contains an individual number, the current date and time, the selected waiter, and table.
4)The created bill can be canceled at any time if, for example, the person changes their mind about ordering something. The bill is immediately deleted from the server.
5)Dishes can be added to the bill by selecting them from the list in a pop-up modal window.
6)After adding dishes, the current bill displays their list and the total order amount.
7)When the bill is closed, the total order amount is sent to the server, and the bill itself is moved to the "Bills Archive" section.

Since this is a demonstration application, it does not include registration and authorization. Any visitor can edit all data as they want. Therefore, keep this in mind if you see any indecent information in the application. 

Technologies used: HTML5, CSS3, CSS FLexbox, CSS Animation, JavaScript. REST API, Webpack.

The free mockapi.io service was used as the server-side.
