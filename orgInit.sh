#!/bin/bash

#create scratch org
sfdx force:org:create -f config/project-scratch-def.json -a FSCADK2 --setdefaultusername -d 1

sfdx force:source:push 

sfdx force:user:permset:assign -n Lightning_Components_Sample_Pack_Recruiting

sfdx force:data:tree:import --plan sfdx-out/plan.json

sfdx force:org:open

