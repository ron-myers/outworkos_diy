# Your Inbox Is a To-Do List You Don't Control

> **Outwork OS is open source and free. Get started at [outworkos.me](https://outworkos.me)**

I get somewhere between 100 and 200 emails a day. Even with Gmail filtering out the marketing and subscription noise, the volume of real communication I need to track is overwhelming. I've tried Getting Things Done. I've tried Inbox Zero. I go through cycles of feeling on top of it, only to watch it fill back up with no clear way to reorient myself around what actually matters.

At some point I realized what was happening. When you work from your inbox, you're working from a to-do list you didn't write. Someone else decided what's on it. Someone else decided the order. And the most recent email sits at the top, regardless of whether it's the most important thing you could be doing right now.

I wanted to be responsive and proactive. The irony was that working from my inbox made me anything but.

## The Cycle That Doesn't Break

I wrote about this problem back in November 2024 when I built Traction, a priorities app, during a hackathon. The core idea was simple: define your priorities, break them into actions, reflect daily. It helped. But it didn't solve the underlying tension, which is that there's a constant battle between working on priorities and just working.

I kept iterating because the problem didn't go away. I tried rule-based systems. I tried using approved contacts to filter through the noise. I tried the Eisenhower matrix. None of it stuck because the judgment calls shift constantly. What's urgent today wasn't urgent yesterday. What's important depends on context that no static system can hold.

The thing that kept me building was knowing that the outcomes I'm trying to accomplish are non-trivial, and a better system was needed.

## The Tipping Point

Two things changed. I stopped trying to build an app, and Claude got good enough to do the work.

That second part is specific. Claude Opus 4.6 was the first time I found an AI that could triage my inbox better than I could. Not just tone-matching on email drafts, which Gemini and others can do passably. Actual triage: reading messages in the context of what I'm working on, who the people are, what the timelines look like, and what I've already committed to.

The unlock was something I call a **context map**. For each of the projects I work on, Claude interviews me, one question at a time, to collect everything relevant: the people involved, the timeline, the files, the systems of record. It's as simple as creating a folder and having a conversation.

What that means is that when Claude is connected to the sources of truth for all of that information, it can assemble a detailed picture and triage the variables far better and faster than I ever could. My role becomes orchestrator. I determine where my priorities are. I communicate that to Claude. It produces my action plan.

## What Outwork OS Actually Does

I have 23 projects running through it right now. Before that sounds overwhelming, a project can be as simple as a dedicated initiative. It doesn't need to be large in scope. It's just a reference point for organizing the who, the what, the why, and the how in one place.

A couple of times a day, the system runs a scan. It goes through every project, reads each context map, and checks sent and received email to get an up-to-the-moment understanding of where things are. That understanding syncs with Todoist, which becomes my action list.

Instead of opening my inbox, I open Todoist. I look at my day and prioritize based on what the system believes is most urgent. Then I open Claude and go through one task at a time, right in the context of that project.

Communication got dramatically faster. Claude doesn't just draft emails. It drafts emails with the right context, so that 95% of the time what it produces is what I send. Early on, that number was significantly lower. Almost unusable, honestly. The difference is context. Other tools can get the tone right, but the context is insufficient to know or anticipate what I actually want to say.

I also use it in combination with Wispr Flow, which lets me talk to Claude and provide the last bit of tuning needed. Voice to text for the final adjustments. As far as tone and accuracy, it's gone through the roof.

By the end of an hour-long work session, not only is more work done, but there's a log of everything that happened. The next time I pick up where I left off, that context is provided to Claude and I don't have to explain anything.

## I Didn't Write a Single Line of Code

Claude built 100% of Outwork OS. Every script, every skill, every migration, every line of configuration.

My contribution is understanding the problem, understanding the experience I want, and understanding what outcomes I'm expecting. That's it. Product thinking. Knowing what to build and why, not how.

This is the part that I think matters most for the people reading this. The skill that makes this work is not coding. It's clarity about what you need and the willingness to iterate until you get there.

## Why It's Open Source

I think Claude and tools like it are changing what the value of software is. In the next few years, we're going to transition from paying for software to paying for outcomes. The job of innovators is to understand the outcomes people are trying to accomplish and ensure that the value they add is tied to the entire experience of going from concept to outcome, not just the software itself.

The idea of creating a company around a piece of software is being challenged. This project is about iterating and collaborating with others who are also trying to solve this problem, so that we're all producing the best possible work we can.

I also think this is an important skill that right now is likely to resonate most with people using tools like Claude Code. But soon, Claude co-work and now Copilot co-work are going to be how everyone works. Getting good at this now puts you ahead.

## Getting Started

Outwork OS runs on Claude Code with Supabase as the database, Google Workspace for email and calendar, and Todoist for task management. If you're comfortable in a terminal, one command scaffolds everything:

```
npx create-outworkos
```

Or you can just open Claude Code and tell it: "Go to OutworkOS.me and set it up for me." It will read the site, find the instructions, and walk you through the whole thing. That's the point. Claude is the interface.

The interactive setup handles the rest. Supabase is free for up to two databases, so don't be discouraged if you don't have an account. If you choose quick mode for Google, you don't even need to touch Google Cloud Console. The built-in Anthropic connectors handle Gmail and Calendar out of the box.

It's still rough around the edges. It requires using a terminal, which some people perceive as technical. But really, Claude Code is just a chat window. Non-technical people simply have to experience it. When they do, there's a very fast adoption period.

Those working in environments with restrictions on what technology you can use may not qualify for this right now. But for every individual who is curious about what AI can do and is struggling to be productive because of everything I've described, I'd encourage you to take a shot.

## The Future of Work

The future of work is going to look very little like our past. The only way to be in a position to continue adding value as an individual contributor is to put in the reps with this technology. It's a necessary step to understand what's possible. Until you experience it personally, it stays abstract.

Don't be afraid of having to find an API key or figure out how to open a terminal. It may be intimidating, but that's because it's new, not because it's hard.

What systems have you built or found to take back control of your time? I'd love to hear what's working for you.
