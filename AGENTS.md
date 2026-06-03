# OpenCode Execution Rules

## Git & Branch Restrictions
- NEVER perform write operations, code generation, or builds directly on the 'main' branch.
- If the current active git branch is 'main', you are restricted to READ-ONLY mode. 
- If changes are required, explicitly prompt the user to switch to a feature branch or create a new branch before proceeding.
- Never execute git commits or push commands on 'main'.
