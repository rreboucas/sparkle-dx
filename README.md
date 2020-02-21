# Lightning Components Sample Pack - Recruiting (Project Sparkle)

Example Lightning App with a set of Generic Responsive Lightning Components capable of loading and interacting with data from any Salesforce Object. Components can be surfaced on Standard (record pages and Home Page) and Custom Lightning Pages. Components can be put together on Lightning Pages and communicate with each other using Lightning Standard Events.

## Installation Instructions
## Installing Recipes using Salesforce DX

1. Set up your environment. Follow the steps in the [Quick Start: Lightning Web Components](https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/) Trailhead project. The steps include:

  - Enable Dev Hub in your Trailhead Playground (ISV Partners already have the Dev Hub enabled on their Partner Business Orgs (PBOs))
  - Install Salesforce CLI
  - Install Visual Studio Code
  - Install the Visual Studio Code Salesforce extensions, including the Lightning Web Components extension

2. If you haven't already done so, authenticate with your hub org and provide it with an alias (**myhuborg** in the command below):

  ```
  sfdx force:auth:web:login -d -a myhuborg
  ```

3. Clone the sparkle-dx repository:

  ```
  git clone https://github.com/rreboucas/sparkle-dx.git
  cd sparkle-dx
  ```

4. Create a scratch org and provide it with an alias (**sparkle-dx** in the command below):

  ```
  sfdx force:org:create -s -f config/project-scratch-def.json -a sparkle-dx
  ```

5. Push the app to your scratch org:

  ```
  sfdx force:source:push
  ```

6. Assign the **Recruitment** permission set to the default user:

  ```
  sfdx force:user:permset:assign -n Lightning_Components_Sample_Pack_Recruiting
  ```

7. Load sample data:

  ```
  sfdx force:data:tree:import --plan sfdx-out/plan.json 
  ```

8. Open the scratch org:

  ```
  sfdx force:org:open
  ```

9. In App Launcher, select the **Recruitment** app.


## Built With

* [Lightning Web Components Components](https://developer.salesforce.com/docs/component-library/documentation/lwc) - Lightning Web Components - 1st Programming Model used
* [Lightning Components Framework](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/intro_framework.htm/) - Lightning Aura Components - 2nd Programming Model used
* [Lightning Design System](https://www.lightningdesignsystem.com//) - Lightning Design System



## Authors

* **Rodrigo Reboucas** 
* **Kamlesh Patel** 
* **Michael Holt** 
* **Vanessa Chalem**
* **Sangita Gupta** 
* **Calvin Ou** 
* **Hemant Jawale** 
* **Jaswinder Rattanpal** 
* **Lightning-UI ISV TE Experts Team** 


## License

This project is licensed under the BSD 3-clause license - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Dreamhouse App

Deploy to scratch org: Make sure you have created connected app in your developer hub org and assigned that connected app to the profile you are going to authorize against.
===============================================
[![Deploy](https://deploy-to-sfdx.com/dist/assets/images/DeployToSFDX.svg)](https://labappdeploy.herokuapp.com/?template=https://github.com/rreboucas/sparkle-dx.git&sco=true)


Deploy to regular dev org: 
===========================
[![Deploy](https://deploy-to-sfdx.com/dist/assets/images/DeployToSFDX.svg)](https://labappdeploy.herokuapp.com/?template=https://github.com/rreboucas/sparkle-dx.git&sco=false)


