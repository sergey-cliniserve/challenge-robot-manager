## Robot manager

#### User Story

We want to assign tasks to the most suitable robot

#### User acceptance tests

- Robot manager is able to instruct any robot simulator to move to a given location
- When given a task at location [x,y], robot manager is able to pick the robot simulator closest to that location and instruct that robot to move there

#### Testing plan

```gherkin
Scenario: Assigning task to the closest robot
  When a robot manager is given a task at location [x,y]
  Then it will pick the robot simulator closest to that location
  And tell the robot simulator to move to location [x,y]
```

----

#### User Story

We want robots to complete an ongoing delivery before starting a new one

#### User acceptance tests

- Robot manager never assigns a task to a robot while the one is travelling

#### Testing plan

```gherkin
Scenario: Less optimal robot is chosed while the most optimal one is travelling
  When there is a task to travel to waypoint A
  And two robots (Robot 1 and Robot 2) are working
  And Robot 1 is closer to waypoint A than Robot 2
  And Robot 1 is already travelling
  Then Robot 2 is assigned to travel to waypoint A
```

---

Always up-to-date description is in Notion:
https://www.notion.so/cliniserve/Backend-Engineering-task-23e65af5cded430496e24159708ab5c9
