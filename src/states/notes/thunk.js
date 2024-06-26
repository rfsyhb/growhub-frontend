import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  createNoteActionCreator,
  updateNoteActionCreator,
  deleteNoteActionCreator,
  receiveDetailNoteActionCreator,
  receiveNotesByUserActionCreator,
  clearDetailNoteActionCreator,
} from './action';
import api from '../../utils/api';

function asyncReceiveNotes() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const notes = await api.getNotesByUser();
      dispatch(receiveNotesByUserActionCreator(notes));
      dispatch(clearDetailNoteActionCreator());
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncCreateNote({ title, body, archived }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const note = await api.createNote({ title, body, archived });
      dispatch(createNoteActionCreator(note));
      dispatch(asyncReceiveNotes());
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncGetDetailNote({ noteId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const note = await api.getDetailNote({ noteId });
      dispatch(receiveDetailNoteActionCreator(note));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpdateNote({ title, body, archived, noteId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const note = await api.editNote({
        title,
        body,
        archived,
        noteId,
      });
      dispatch(updateNoteActionCreator(note));
      dispatch(asyncGetDetailNote({ noteId }));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDeleteNote({ noteId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.deleteNote({ noteId });
      dispatch(deleteNoteActionCreator({ noteId }));
      dispatch(receiveDetailNoteActionCreator(null));
      dispatch(asyncReceiveNotes());
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  asyncReceiveNotes,
  asyncCreateNote,
  asyncUpdateNote,
  asyncDeleteNote,
  asyncGetDetailNote,
};
