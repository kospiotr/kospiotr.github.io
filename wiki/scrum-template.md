---
layout: wiki
title: Scrum template
comments: false
toc: true
editurl: wiki/scrum-template.md
---

# Scrum
## Sprint length
2 weeks, planning at the start, review at the end, starting Tuesday or Wednesday (1 to choose) (a lot of meetings at Monday).

## Roles
1.	**Product Owner** – the only person responsible for items in product backlog and it’s prioritisation. One person. 
2.	**Scrum Master** – facilitator for the team, helps in impediments removal (Bartlomiej Labno/Piotr Kosmowski + rotational team support)
3.	**Developer** – member of the team
Scrum team consists of PO, SM and Developers.

## Artifacts
1.	**Product backlog** – list of all items to be done in the project. Product Owner is responsible for product backlog. He may delegate this task but the content and order are his responsibility. The product backlog usually grows in time. There is one product backlog for the product.
2.	**Sprint backlog** – the list of tasks to be done in current sprint. The team forecasts how many tasks are to be done having capacity and velocity in mind. Every scrum team (pod) has separate sprint backlog. 
3.	**Increment** – the added value of given sprint.

## Scrum ceremonies/Meetings
1.	**Planning**
	* **Timebox**: Up to 4 hours/sprint, but it could end quicker. Proposition: 2h of “What” part with Product Owner and 2h of “How” part internally in teams. 
	* **Attendees**: Product owner + dev team 
	* **Goal**: It answers two questions: “What should we do in the next sprint?“ and “How should we achieve it?” 
The “What” part is common for all scrum teams. Teams fill their sprint backlog with product backlog items basing on capacity and velocity and having task order in mind. Product owner is required to confirm the order, explain details etc.
The “How” part may be separate for every scrum team. Team thinks how to do the work selected to the sprint backlog, how to split it into tasks.
3.	**Review** 
	* **Timebox**: up to 2 h/sprint
	* **Attendees**: Product owner + dev team + stakeholders
	* **Goal**: Presentation of the sprint results, demo, getting the feedback.
4.	**Daily**
	* **Timebox**: Up to 15 min every day/pod (possibility not to do at demo day or planning day), same time and place 9 AM LDN time (conference call).
	* **Attendees**: Developers + Scrum Master (optional) + external domain specialists (optional)
	* **Goal**: Synchronize done work from the developer perspective. Plan upcoming work for next day. Raise blockers. Don’t go into details - > interested people should have another meeting with the details. We update jira task statuses before daily.
5.	**Scrum of scrums**
	* **Timebox**: Up to 15 min, every day
	* **Attendees**: Every scrum team representation + Scrum Master (optional?) + Product Owner
	* **Goal**: Synchronize done work, plan work for next day, raise blockers – all from scrum team perspective.
6.	**Retrospective**
	* **Timebox**: Up to 1.5 h/sprint, may be finished quicker
	* **Attendees**: Scrum master + developers + product owner – could be interchangeably – every pod by itself and all pods together.
	* **Goal**: Identifying good things from last sprint and areas of improvement. It ends with short list of actions to be done before next retrospective. Each action has an owner. These actions are reviewed at the next retrospective meeting.
7.	**Refinement**
	* **Timebox**: Up to 10% of team capacity, 1-3 meetings/sprint
	* **Attendees**: Product owner + subset of developers (for example Business Analysts) + domain specialists
	* **Goal**: Get deeper understanding of the tasks for the next 2-3 sprints: better description, splitting into more separate stories, estimation, order/prioritization of tasks. 

## Ready state
1.	Work is described in Jira.
2.	Description of the functionality verification is added to the Jira ticket.
3.	Team understands requirements.
4.	Task is estimated.

## Done state – initial proposition
1.	Task development is finished. Code is committed.
2.	Functionality is tested – JUnit or other relevant tests
3.	Code is reviewed – peer to peer review of every commit. 2 approvals needed.
4.	Functionality is tested on test environment.
5.	Acceptance criteria are met.

Exemplary meetings calendar
