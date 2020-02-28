
# Notes UI

This is the front end for `Notes` - Online notes application

### Prerequisite
- Install node v13.8.0. Please view this link if you are not installed [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- Install Angular CLI 9.0.3. To install [https://angular.io/cli](https://angular.io/cli)
- Make sure that your machine have `Docker - 19+` , `Docker Machine` and `Docker compose` installed. Follow the links below if not installed.
https://docs.docker.com/install/
https://docs.docker.com/compose/install/
https://docs.docker.com/v17.12/machine/get-started/#create-a-machine

### Check out application 
Run the command below to clone the application
```
#git clone https://github.com/jeroldleslie/my-notes-ui
``` 

## How to run using script?
After checking out the application to your local machine go to the application directory
```
#cd <path-to-your-project>/my-notes-ui
```
#### Step-1  - Run docker machine
Run the below commands one by one.
```
# docker-machine start default

# docker-machine env default

# eval "$(docker-machine env default)"
```
#### Step-2  - Get and set docker-machine IP
- Get docker-machine IP. Run the below command to get docker-machine IP
```
# docker-machine ip default
```
you will get the IP address which we want to configure later in angular environment file.

Example:
```
#docker-machine ip default
#192.168.xxx.xxx
```
#### Step-3 - Replace environment.prod.ts value

- Replace environment values in `src/environments/environment.prod.ts`

from
```
export  const environment = {
production: true,
backendApiUrl: processLocal.env.API_URL
};
```
to
```
export  const environment = {
production: true,
backendApiUrl: http://<docker-machine IP>:8000
};
```
Make sure that the IP address should be docker-machine IP (which we got earlier)

#### Step-4 Run docker-compose
Before running this make sure that the application API is running. To run the API follow this link [https://github.com/jeroldleslie/my-notes-backend#run](https://github.com/jeroldleslie/my-notes-backend#run)

Run the below command to run UI. 
```
# docker-compose -f ./docker-compose.yml up --build -d web
```

Yaayyyyy `Note` Web is up and running now.

### Access UI from IP http://\<docker-machine-ip\>:8081
  
## Project Development Details

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.3.

  

## Development server

  

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/` . The app will automatically reload if you change any of the source files.

  

## Code scaffolding

  

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module` .

  

## Build

  

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

  

## Running unit tests

  

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

  

## Running end-to-end tests

  

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

  