#!/bin/bash

#create scratch org
sfdx force:org:create -f config/project-scratch-def.json -a FSCADK2 --setdefaultusername -d 1

#install pckg for sample loginflows 
sfdx force:package:install --package 3D04to0000000WA6J -w 20


sfdx force:source:push 

sfdx force:user:permset:assign -n Lightning_Components_Sample_Pack_Recruiting

sfdx force:data:tree:import --plan sfdx-out/plan.json

#Run Apex commands as needed
sfdx force:apex:execute -f config/create-demo-data-setup.apex

sfdx force:org:open

