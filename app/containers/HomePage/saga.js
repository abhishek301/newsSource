import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { REQUEST_NEWSSOURCE } from './constants';
import { newsSourceSuccess, newsSourceError } from './actions';

function* getNewsSource() {
  const requestURL = `https://newsapi.org/v2/sources?language=en&apiKey=${process.env.APP_API_KEY}`;
  const requestParams = {
    method: 'get',
  };
  try {
    const response = yield call(request, requestURL, requestParams);
    yield put(newsSourceSuccess(response.data));
  } catch (err) {
    yield put(newsSourceError(err));
  }
}

// Individual exports for testing
export default function* homePageSaga() {
  yield takeLatest(REQUEST_NEWSSOURCE, getNewsSource);
}
