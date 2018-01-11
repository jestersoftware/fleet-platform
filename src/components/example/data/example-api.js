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
    "accessToken": "f_-UKfFZuMsKLHaTufuEUcow22-1Wo_j",
    "idToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1FVkRRakpETXpsQk1EZ3lOVGN3UlRSR1JURXlNRE00TkRCR01ERTBNVVk1TkRZNE1UZzBSUSJ9.eyJpc3MiOiJodHRwczovL3RyaW1ibGUtZGV2LmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExNTY4MDY3MTIyNTUzOTQ4MzI0MyIsImF1ZCI6ImQ4V3pqU1psaEhkZEUwZndKYU00UVYxYTlnMnJJTDRmIiwiaWF0IjoxNTE1Njg3NzE5LCJleHAiOjE1MTU3MjM3MTl9.KAq10JnpxsAs_HVP_T1jkmGbQLkEWw6ZDv3-o-esPGRO1AToV0Jl0b16G_Ww8Ao8_mgS3nw_ZgNt3CWd5X50kMmmLfCg2q1a3hBdyFhUSZjSjYmxRQ9Qv7-a2GyfqyRMVn60rgjQuJeAWv-Gb0_fS5_ZBc8o4J8AyfrryIptAZOFds_YKcO1aEk8Lvj6Oxy4u736LlwxQACsil1LRqBKJsZwYlWZ7EMKfhWL32lSwzli8QDLBbvL4FcbmpeFuqXeJVF75n4PmvgYG9KBi3x5RAOKE5uA6sScpHdfYyGZDUPRBoTNYJQsmbFda-0tEhDcNqBzE-UY4LVRuTiD_G8EOg",
    "expiresIn": 86400,
    "tokenType": "Bearer",
    "state": "1uqw~OJkR226kSyIFM~sP4yz95aY288Y",
    "expiration": "1515723721786",
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
        "updated_at": "2018-01-11T16:21:59.348Z",
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
