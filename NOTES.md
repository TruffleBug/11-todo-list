NOTES

- factories or constructors/classes?
<!-- - figure out how to do localStorage -->
- only project and title generally viewable - all other properties viewable in 'details'
  <!-- - need to append task list to .taskTable (is appended to content right now) -->
  <!-- - change Priority in forms to datalist -->
- make edit dialog a separate function
<!-- - make new task it's own class -->
- why is \_ needed for get/set in Task class? (otherwise error Max Call Stack Size Exceeded)

PROPERTIES

- task title [0]
- notes [1]
- project [2]
- dueDate [3]
- priority [4]
- checkBoxes

MODULES

- On load (index)

- DOM selectors

- Create new task

- Update window display - View All
- Update window display - View by Project

- Delete task
- Check completed task
- Edit task

- Create new project
- Delete project

INDEX (ON LOAD)

- setUpEventListeners - OK
- makeTableHeading - OK
- getStoredTasks - OK
  - for each entry, makeLineItem - OK
    - makeLineItem to include EDIT
    - makeLineItem to include DELETE - OK
