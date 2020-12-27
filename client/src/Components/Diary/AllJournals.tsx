import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserJournals } from '../../store/Actions/GetAllUserJournals/GetJournals';
import '../../styles/AllJournals.css';
import ScreenLoader from '../../assets/screenLoader.gif';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import CommentIcon from '@material-ui/icons/Comment';
import { ThumbsUpDown } from '@material-ui/icons';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
interface Props {}

export const AllJournals = (props: Props) => {
  const { loading, error, userJournal } = useSelector(
    (state) => state.allUserJournals
  );

  const [isClosingButtonVisible, setIsClosingButtonVisible] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUserJournals());
  }, [dispatch]);

  const ShowMore = (idx: number, readmoreButton: string) => {
    const elementID: any = document.getElementById(`${idx}`);
    const readMoreButtonClass: any = document.getElementById(
      `${readmoreButton}`
    );
    const closingButton: any = document.getElementById(
      `close-journal-btn-${idx}`
    );
    if (elementID.style.display === 'none') {
      elementID.style.display = 'inline';
      readMoreButtonClass.style.display = 'none';
      closingButton.style.display = 'block';
    } else {
      elementID.style.display = 'none';
      readMoreButtonClass.style.display = 'inline';
      closingButton.style.display = 'none';
    }
  };

  return (
    <div className="User__journals">
      {loading ? (
        <img
          src={ScreenLoader}
          alt="Fetching All Your Journals..."
          className="loading__screen"
        />
      ) : error ? (
        <h3>{error.msg}</h3>
      ) : userJournal ? (
        <div className="userJournals__list">
          <div className="journalList__header">
            <h3>All My Journals</h3>
          </div>
          {userJournal[0].journals.map((journal: any, idx: number) => {
            const text = journal.journal.split(`${journal.date}`)[1];
            return (
              <div className="journalList__contet">
                <div className="content__header">
                  <h4>{journal.date}</h4>
                </div>
                <div className="content__textJournal">
                  <p className="textJournal__text">{text.slice(1, 40)}</p>
                  <p className={`textJournal__text hidden-text`} id={`${idx}`}>
                    {text.slice(40)}
                  </p>
                  <a
                    href="#"
                    className="textJournal__text"
                    id={`toggle-button-${idx}`}
                    onClick={() => ShowMore(idx, `toggle-button-${idx}`)}
                  >
                    ... Read More
                  </a>

                  <div className="journal__stats">
                    <div className="stats__likes">
                      <ThumbUpAltIcon />
                      <h4>{journal.upvotes}</h4>
                    </div>
                    <div className="stats__dislikes">
                      <ThumbDownAltIcon />
                      <h4>{journal.downvotes}</h4>
                    </div>
                    <div className="stats__comments">
                      <CommentIcon />
                      <h4>{journal.comments.length}</h4>
                    </div>
                  </div>
                  <div className="buttons">
                    <Popup
                      trigger={
                        <button
                          className="journal-btn btn-journal"
                          id={`close-journal-btn-${idx}`}
                        >
                          Options
                        </button>
                      }
                    >
                      <div className="options">
                        <h4
                          className="journal-option-action"
                          onClick={() => ShowMore(idx, `toggle-button-${idx}`)}
                        >
                          Close Journal
                        </h4>
                        <h4 className="journal-option-action">Edit Journal</h4>
                        <h4 className="journal-option-action">
                          Delete Journal
                        </h4>
                        <h4 className="journal-option-action">
                          Share Journal(Global)
                        </h4>
                        <h4 className="journal-option-action">
                          Share Journal(PD Group)
                        </h4>
                      </div>
                    </Popup>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h4>No Journals</h4>
      )}
    </div>
  );
};
