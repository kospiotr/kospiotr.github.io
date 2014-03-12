---
layout: wiki
title: EMS
comments: false
---
# TIBCO EMS Troubleshooting-How to find consumer and producers for EMS destinations?

1. Based on queue name, find the consumer id and connection id.

 `show  consumers queue=TEST.CIB.1LST.LTD.RequestReply.ReferenceData.2 full`

 ```bash
      Id Conn   Sess     User      T Queue                                              
53675650 383273 55949126 1lst_lstm Q TEST.CIB.1LST.LTD.RequestReply.ReferenceData.2
53675651 383273 55949127 1lst_lstm Q TEST.CIB.1LST.LTD.RequestReply.ReferenceData.2
```

2. Based on ‘Conn’ – connection id, we can find host from where connection is being made. Take out all the connections either based on user or if user not know, take all and then search the connection id from the list. 
3. Third column in above statement output is session ID. We can also use Gems tool to find above details from consumers section. In Gems tool, go to consumers and sort the queue name, it list down connection id and session id for each connection/consumer id.
4. To find the producer for a given destination, best way to find the details is to use Gems tool. Gems tool provides the producer column as well for each destination.
