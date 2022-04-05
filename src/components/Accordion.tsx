import React, { ReactElement, useEffect, useState } from 'react'
import he from 'he';

type Question = {
  correct_answer: string,
  question: string
}

function Accordion(): ReactElement {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=5&type=boolean`, { method: 'GET' })
      .then(response => response.json())
      .then(response => setData(response))
      .then(() => setLoading(false))
      .catch(err => console.error(err));

    const details = document.querySelectorAll("details");
    details.forEach((detail) => {
      detail.open = false;
    });
  }, [refresh]);

  return (
    <div>
      <h2>The Trivia Accordion (True or False)</h2>
      {
        loading ? (
          <p>Loading content...</p>
        ) : (
          <div>
            {
              data!.results.map((question: Question) => (
                <details>
                  <summary>
                    <b>{`${he.decode(question.question)}`}</b>
                  </summary>
                  <span>{`${he.decode(question.correct_answer)}`}</span>
                </details>
              ))
            }
          </div>
        )
      }
      <button onClick={() => setRefresh(!refresh)}>Refresh questions</button>
    </div>
  )
}

export default Accordion
