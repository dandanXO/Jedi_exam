import Layout from '../components/Layout';

export default function Home() {
  const Header = () => (
   
      <h1 className="font-bold text-4xl text-center">
        Frontend Engineer Assessment
      </h1>
  );
  const Introductions = () => (
    <>
      <p className="mt-6">
          Welcome to our frontend engineer assessment! This test is designed to
          evaluate your frontend development skills and related knowledge.
        </p>
        <p className="mt-4">
          Please read each question carefully and imagine them as typical work
          tasks. Respond in the same manner you would during your regular work.
        </p>
        <p className="mt-4">
          You can create any folders, ts/tsx/css files you need at any position
          that you think is appropriate.
        </p>
        <p className="mt-4">Here's the requirements for the assessment:</p>
    </>
  );
  const requirements = [
    ` <strong>NEVER</strong> change anything in the directories named in
    the pattern
    <span className="font-bold inline mx-1 py-0.5 px-1.5 border border-amber-400 bg-amber-50 rounded">
      **/api/**
    </span>`,
    `<li className="mt-1">Style with tailwindcss and css file.</li>`,
    ` <li className="mt-1">
    Use
    <span className="font-bold inline mx-1 py-0.5 px-1.5 border border-amber-400 bg-amber-50 rounded">
      axios
    </span>
    to fetch data
  </li>`,
    `<li className="mt-1">
    Implement Responsive Web Design (RWD) with a breakpoint at 768px (md
    in tailwindcss default breakpoints)
    </li>`,
    `<li className="mt-1">
    <p>
      Submit the URL of your answer repository by
      <strong className="mx-1">
        23:59 on the 5th day after receiving the questions,
      </strong>
      and cease answering (pushing commits). For example: if you receive
      the questions on Mar 1st, you should submit the answer by 23:59 on
      Mar 5th.
        </p>
      </li>`
  ];
  const Requirements = () => (
    <ul className="list-decimal pl-6">
      {requirements.map((requirement, index) => (
        <div key={index} className="mt-1">
          <div dangerouslySetInnerHTML={{ __html: requirement }} />
        </div>
      ))}
    </ul>
  );
        
  return (
    <Layout>
    <div className="bg-amber-50 p-4 min-h-screen">
      <div className="p-4 max-w-[720px] mx-auto bg-white rounded shadow">
        <Header></Header>
        <Introductions></Introductions>
        <Requirements></Requirements>
        <p className="mt-4">Good luck! Let's get started.</p>
        <div className="mt-6 border-t pt-6">
          <h2 className="text-xl font-bold">Problem 1: Refactoring</h2>
          <p className="mt-1">
            For this task, your objective is to refactor the current page
            following your coding conventions and best practices. Look for
            opportunities to enhance code structure, eliminate redundancy,
            clarify variable names, and simplify complex logic.
          </p>
        </div>
        <div className="mt-6 border-t pt-6">
          <h2 className="text-xl font-bold">Problem 2: Maze</h2>
          <p className="mt-1">
            For this task, your objective is to implement a page where a mouse
            traverses a maze to find cheese.
          </p>
          <p className="mt-4">
            During server-side rendering, you need to hit the
            <span className="font-bold inline mx-1 py-0.5 px-1.5 border border-amber-400 bg-amber-50 rounded">
              /api/maze
            </span>
            endpoint to fetch the maze map array and display all the maps along
            with their respective start buttons on the screen. When the user
            clicks the start button, the mouse on that map will begin to solve
            the maze using Depth-First Search (DFS), with each step taking 100
            ms.
          </p>
          <p className="mt-4">
            Meanwhile, the start button will disappear, replaced by a reset
            button. Clicking the reset button will stop the mouse's movement,
            reset the map to its initial state, and the reset button will be
            replaced by the start button again.
          </p>
          <p className="mt-4">
            <a
              className="underline font-bold text-amber-500 cursor-pointer hover:text-amber-400 mr-1"
              href="https://youtube.com/shorts/uA744cMSNK8?si=U80OGTvH3rGV17zu"
              target="_blank"
            >
              Click
            </a>
            to watch a demonstration of the expected behavior.
          </p>
          <p className="mt-4">Note that:</p>
          <ul className="list-decimal pl-6">
            <li className="mt-1">
              Put this page at the route
              <span className="font-bold inline mx-1 py-0.5 px-1.5 border border-amber-400 bg-amber-50 rounded">
                /find-the-cheese
              </span>
              , and title it
              <strong className="mx-1">'Find the cheese'.</strong>
            </li>
            <li className="mt-1">
              Add description, "Click 'Start' to see how the mouse find the
              cheese by using DFS!", below page title
            </li>
            <li className="mt-1">
              The color of the walls is
              <span className="font-bold inline mx-1 py-0.5 px-1.5 border border-amber-400 bg-amber-50 rounded">
                green-800
              </span>
            </li>
            <li className="mt-1">
              The color of the path is
              <span className="font-bold inline mx-1 py-0.5 px-1.5 border border-amber-400 bg-amber-50 rounded">
                lime-50
              </span>
            </li>
            <li className="mt-1">
              The icon of the mouse is
              <span className="font-bold inline mx-1 py-0.5 px-1.5 border border-amber-400 bg-amber-50 rounded">
                LuRat
              </span>
              with color
              <span className="font-bold inline mx-1 py-0.5 px-1.5 border border-amber-400 bg-amber-50 rounded">
                neutral-500
              </span>
            </li>
            <li className="mt-1">
              The icon of the cheese is
              <span className="font-bold inline mx-1 py-0.5 px-1.5 border border-amber-400 bg-amber-50 rounded">
                FaCheese
              </span>
              with color
              <span className="font-bold inline mx-1 py-0.5 px-1.5 border border-amber-400 bg-amber-50 rounded">
                amber-400
              </span>
            </li>
            <li className="mt-1">
              Highlight current path with color
              <span className="font-bold inline mx-1 py-0.5 px-1.5 border border-amber-400 bg-amber-50 rounded">
                amber-200
              </span>
            </li>
            <li className="mt-1">
              The button has a background color of amber-500, and a hover
              background color of amber-400.
            </li>
            <li className="mt-1">
              <span className="font-bold inline mx-1 py-0.5 px-1.5 border border-amber-400 bg-amber-50 rounded">
                /api/maze
              </span>
              simulates an endpoint on another server, so you need to use axios
              to fetch the data.
            </li>
          </ul>
        </div>
        <div className="mt-6 border-t pt-6">
          <h2 className="text-xl font-bold">Problem 3: Layout</h2>
          <p className="mt-1">
            For this task, your objective is to create and apply a global shared
            layout. The layout should consist of:
          </p>
          <ul className="list-decimal pl-6">
            <li className="mt-1">
              A header displaying
              <strong className="mx-1">'Jedi Software'</strong> that collapses
              when scrolling up and reappears when scrolling stops.
            </li>
            <li className="mt-1">
              A collapsible menu offering redirection to the homepage and
              <span className="font-bold inline mx-1 py-0.5 px-1.5 border border-amber-400 bg-amber-50 rounded">
                /find-the-cheese
              </span>
              .
            </li>
          </ul>
        </div>
      </div>
    </div>
    </Layout>
  );
}
