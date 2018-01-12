import { isString } from 'lodash'
// import store from '../../store'
// import Environment from '../helpers/Environment'

class BaseApi {
    async fetch(url, options = {}) {
        // let state = store.getState()
        // let { auth, currentOrg = {} } = state.app

        options.headers = options.headers || {}
        options.headers['Content-Type'] = 'application/json'
        if (!options.unauthenticated) {
            if (auth && auth.idToken) options.headers['Authorization'] = `Bearer ${auth.idToken}`
            if (currentOrg.id) options.headers['X-Tenant'] = currentOrg.id
        }
        if (options.body && !isString(options.body)) options.body = JSON.stringify(options.body)

        let serviceUrl = options.proxy ? '' : this.url
        let res = options.local ? await fetch(url, options) : await fetch(`${serviceUrl}/${url}`, options)
        if (res.ok) {
            return await this.tryJson(res)
        } else {
            let body = await this.tryJson(res)
            let { status, statusText } = res
            let result = { status, statusText, body }
            console.error('Http Error:', result)
            return Promise.reject(result)
        }
    }

    async tryJson(res) {
        let text = await res.text()
        try {
            return JSON.parse(text)
        } catch (ex) {
            return text
        }
    }

    get url() {
        const urls = {
            local: 'http://localhost:8080',
            dev: 'https://security-gateway-dev.connectedfleet.io',
            qa: 'https://security-gateway-qa.connectedfleet.io',
            staging: 'https://security-gateway-staging.connectedfleet.io',
            prod: 'https://security-gateway.fleethealth.io'
        }
        return urls['dev']
    }
}

const currentOrg = {
    id: '00000000-0000-0000-0000-000000000000'
}



const auth = {
    "accessToken": "BKytpToS2hC5HDDuDWxmPEe_sBOUFUYr",
    "idToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1FVkRRakpETXpsQk1EZ3lOVGN3UlRSR1JURXlNRE00TkRCR01ERTBNVVk1TkRZNE1UZzBSUSJ9.eyJpc3MiOiJodHRwczovL3RyaW1ibGUtZGV2LmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExNTY4MDY3MTIyNTUzOTQ4MzI0MyIsImF1ZCI6ImQ4V3pqU1psaEhkZEUwZndKYU00UVYxYTlnMnJJTDRmIiwiaWF0IjoxNTE1NzczMDc0LCJleHAiOjE1MTU4MDkwNzR9.SGXc31Ro0vG5iukEjPVIXhOwOxzx-Tkb2OPThVwg_z51NCXWVFM9KgoasdrrGeeAZ6WgaGRVGcPs5Vdhz_g-8JJEKe7bs0IDxMz3UG_cnCWOKx6AFRspDz_wLkLT_LL1lwQh22MIlsDdNxB8ulVAevlLuXMf5pf1I9YVPCRCdUtzlUBYeRN6lsha__FHmUS4XCCrtrp_s8K5HM8TxVGUy_yXCEJLh3u_zcmffIw0cuwHHc_H1t5WFVdi1E0RYPWaBOz0YVbHaiertP8YfWiycn4cidSwUpFoYMJ8xchQNl2RHFG8Kk7UDiwIdohs6b7Yv7E6Nqft_Qipuvl58jFuMA",
    "expiresIn": 86400,
    "tokenType": "Bearer",
    "state": "MJPM61mEPrS2Y46M4qYXDT2TjBlxUZxn",
    "expiration": "1515809074573",
    "profile": {
        "email": "jeanderson@peoplenetonline.com",
        "name": "Jesse Anderson",
        "given_name": "Jesse",
        "family_name": "Anderson",
        "picture": "https://lh5.googleusercontent.com/-y_X-mWADy6A/AAAAAAAAAAI/AAAAAAAAAAc/QyKjelRIV7I/photo.jpg",
        "locale": "en",
        "nickname": "jeanderson",
        "email_verified": true,
        "clientID": "d8WzjSZlhHddE0fwJaM4QV1a9g2rIL4f",
        "updated_at": "2018-01-12T16:04:33.938Z",
        "user_id": "google-oauth2|115680671225539483243",
        "identities": [
            {
                "provider": "google-oauth2",
                "user_id": "115680671225539483243",
                "connection": "google-oauth2",
                "isSocial": true
            }
        ],
        "created_at": "2018-01-03T16:11:15.749Z",
        "sub": "google-oauth2|115680671225539483243"
    }
}

export default new BaseApi()
