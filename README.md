# Chorus Interview Deliverable

## About This Deliverable

The goals of this project, as understood:
- Produce beautiful code
- Show strengths
- Demonstrate obsession with strong systems and high productivity
- Decide if this is a stack I want to work on

Toward those goals, this repo includes
- an E2E Typescript project of 4 frontend features served by 3 endpoints
- PostgreSQL Database in Docker container initialized by script
- an assessment of the assessment (below)

## Prerequisites

- Virtual environment -- environment may have changed from [source repo](https://github.com/ChorusInnovations/engineering-interview/tree/main) 
- Familiarity with the source repo installation steps

## Connecting to the Database

In order to allow initializing the database at startup, container initialization has been refactored. As a result, the port number is no longer fixed. To explore the database, I recommend using psql on the container itself. To test the connection, as needed, I recommend using psql from the host.

## Descoped

- Limiting Pokémon selections per team to 6
- Guarantee that the 150 Pokémon shown are the *first* Pokémon
- Query indexing
- More thoughtful unit tests

## Learnings

In any project, there is promotable work -- e.g. design, execution -- and non-promotable work -- SDLC, troubleshooting, coordination. In the case of this interview, we can agree "promotion" means advancing to the next interview, which is achieved by meeting the goals stated above. 

Unfortunately, due to the complexity of the tooling and the unfamiliarity of the development environment, I spent only 25% of my time on this project on promotable work. I spent the other 75% on:

- Troubleshooting Docker
    - A forgotten PostgreSQL process shared :5432
    - At some point Docker itself became nonresponsive, which I've never seen before, and took time to track down.

- Navigating DataGrip
    - Having no familiarity with it, I expected it to provide some kind of data persistence for the DB. I ended up using it to design the tables, but the UI was a learning curve, and it would have been more efficient to compose the SQL.  

- Figuring out how to ship the database updates
     - I wanted it to work the way it now works, so that's what I did. If there was an easier way, I did not discover it.

## Self-Assessment

Did I produce beautiful code? Debatable. I am shipping code that does not embarrass me. But I hope you find it easy to read. There is beauty in that.

Did I show strengths? I expect any intermediate engineer could ship what's here. If anything, I showed an old weakness -- an inability to call it quits when I just want to see it work.

Did I demonstrate obsession with strong systems? Debatable. I did not show any consideration to scaling, security, or more than perfunctory testing. Perhaps these can be items to discuss.

Did I demonstrate obsession with high productivity? That is where I may be most useful to you. Non-promotable work eats engineers. We have to eat it back.

In order to reduce the amount of non-promotable work lurking in this interview, so that your candidates may have more time to impress you, I encourage you to omit the live DB and instead back the server with a JSON flat file. The candidate is still responsible for the design, the data is browsable, and the updates are easy ship back for review.

I would be very happy to make this the content of our pair-programming session.

Looking forward to hearing from you!