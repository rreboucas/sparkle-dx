
/*
* Copyright (c) 2018, salesforce.com, inc.
* All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
* For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
*/

({
	connectCometd : function(component) {
    var helper = this;

    // Configure CometD
    var cometdUrl = window.location.protocol+'//'+window.location.hostname+'/cometd/40.0/';
    var cometd = component.get('v.cometd');
    cometd.configure({
      url: cometdUrl,
      requestHeaders: { Authorization: 'OAuth '+ component.get('v.sessionId')},
      appendMessageTypeToURL : false
    });
    cometd.websocketEnabled = false;

    // Establish CometD connection
    console.log('Connecting to CometD: '+ cometdUrl);
    cometd.handshake(function(handshakeReply) {
      if (handshakeReply.successful) {
        console.log('Connected to CometD.');
        // Subscribe to platform event
        var newSubscription = cometd.subscribe('/event/Notification__e',
          function(platformEvent) {
            console.log('Platform event received: '+ JSON.stringify(platformEvent));
            helper.onReceiveNotification(component, platformEvent);
          }
        );
        // Save subscription for later
        var subscriptions = component.get('v.cometdSubscriptions');
        subscriptions.push(newSubscription);
        component.set('v.cometdSubscriptions', subscriptions);
      }
      else
        console.error('Failed to connected to CometD.');
    });
      },

  disconnectCometd : function(component) {
    var cometd = component.get('v.cometd');

    // Unsuscribe all CometD subscriptions
    cometd.batch(function() {
      var subscriptions = component.get('v.cometdSubscriptions');
      subscriptions.forEach(function (subscription) {
        cometd.unsubscribe(subscription);
      });
    });
    component.set('v.cometdSubscriptions', []);

    // Disconnect CometD
    cometd.disconnect();
    console.log('CometD disconnected.');
  },

  onReceiveNotification : function(component, platformEvent) {
    console.log('Received Notification event '+ platformEvent);
    var helper = this;
    // Extract notification from platform event
    var newNotification = {
      time : $A.localizationService.formatDateTime(
        platformEvent.data.payload.CreatedDate, 'HH:mm'),
      message : platformEvent.data.payload.Message__c
    };
    // Save notification in history
    var notifications = component.get('v.notifications');
    notifications.push(newNotification);
    component.set('v.notifications', notifications);

    helper.displayToast(component, 'info', newNotification.message);
  },

    
    displayToast : function(component, type, message) {
        var toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams({
          type: type,
          message: message
        });
        toastEvent.fire();
  	}
})