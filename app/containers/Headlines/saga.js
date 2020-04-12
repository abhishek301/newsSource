import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { REQUEST_HEADLINES } from './constants';
import { headlinesSuccess, headlinesError } from './actions';

function* getHeadlines({ params }) {
  const { id: newsSourceId } = params;
  const requestURL = `https://newsapi.org/v2/top-headlines?sources=${newsSourceId}&apiKey=${process.env.APP_API_KEY}`;
  const requestParams = {
    method: 'get',
  };
  try {
    const response = yield call(request, requestURL, requestParams);
    yield put(headlinesSuccess(response.data));
  } catch (err) {
    yield put(headlinesError(err));
  }
}

// Individual exports for testing
export default function* headlinesSaga() {
  yield takeLatest(REQUEST_HEADLINES, getHeadlines);
}
