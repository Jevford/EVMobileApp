# Developers

* Jevford Barro
* Darrel Belen

# Version

1.0.0

# Set up and Running the Application

Ask the Sponsor/Project lead or Refer to the EVIE Mobile App Documentation for more information.

# Ideas for Future Implementation

## Link chargers to users and users to vehicles

The application is charger-centric, meaning most interaction will revolve around a user’s charger. Chargers can have multiple users connected to them. For example, a family of users can be tied to one charger. Users can also be added to a charger’s user list. 

On top of this, a user may have multiple cars and cars can be added at any time. This structure is best represented with a nested JSON file. A nested JSON file is currently used for collection creation into the non-relational, mongoDB database. This structure may be improved if the team moves to a relational database.

## Implementation of Performance Page

The concept of a Performance Page is included in the EVMobileApp repo, but is not fully implemented. 

Efficiency:
The Efficiency section is used to show the user how well they are optimizing for each factor: cost, environment, and societal.  The user’s performance is determined by the amount of stars they have. A star score is, ideally, given each week so that the user has something to work towards. Along with the star score, a message is shown to display how well the user is optimizing.

Report:
The Report section shows the user how much cost and environmental savings they have accumulated over a certain period of time. The user can display this report for each month, or can choose a certain period of time by clicking on a calendar icon.

Graph:
The graph will display average energy consumed in kW. Ideally, the user would have an option to toggle between showing their personal energy consumption and the average user’s energy consumption. The user may also have the option to toggle between a month view and a week view. A graphing API will be needed to display statistics properly.

## Mobile App Nondependency on MQTT

The current version of the mobile application directly communicates with the mqtt broker, which was left in for the live demonstration.

The future implementation of the mobile application will not allow this, but will communicate with the Coordinator to check for charger states and send charge requests.

The target files to work on the implementation are Home.js and mqttInstance.js.

## Login Verification

The current version of the app does not implement a secure way of logging in, it allows for any username and password.

The hope for the next team is to implement a way to check for valid usernames and passwords within the database.

Implementation idea: Get request of a specific username to userprofile collection and check to see if the username exists and the password matches after de-hashing an encrypted password value.
