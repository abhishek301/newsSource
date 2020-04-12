import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { REQUEST_NEWSSOURCE } from './constants';

function* getNewsSource() {
  const requestURL = `https://newsapi.org/v2/sources?language=en&apiKey=${process.env.APP_API_KEY}`;
  const requestParams = {
    method: 'get',
  };
  try {
    const response = yield call(request, requestURL, requestParams);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

// Individual exports for testing
export default function* homePageSaga() {
  yield takeLatest(REQUEST_NEWSSOURCE, getNewsSource);
}
