import React, { Component } from "react";


class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    callsv() {
        fetch("https://swapi.dev/api/people/")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    let apiResult = result['results'];
                    console.log(apiResult);
                    this.setState({
                        isLoaded: true,
                        items: apiResult
                    });

                },
                (error) => {

                }
            )
    }

    getHomeworld(homeworld_url) {
        const promise = new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();

            request.open('GET', homeworld_url);
            request.onload = () => {
                if (request.status === 200) {
                    let result = JSON.parse(request.response);
                    resolve({ name: result['name'], terrain: result['terrain'], gravity: result['gravity'], climate: result['climate'], population: result['population'] }); // we got data here, so resolve the Promise
                } else {
                    reject(Error(request.statusText));
                }
            };

            request.onerror = () => {
                reject(Error('Error'));
            };

            request.send();
        });
        return promise;
    }

    getFilm(list) {
        let arr = [];
        var filmscall = new XMLHttpRequest();
        for (let i = 0; i < list.length; i++) {
            filmscall.open("GET", list[i], true);
            filmscall.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let result = JSON.parse(this.responseText);
                    arr.push({ title: result['title'], episode_id: result['episode_id'], opening_crawl: result['opening_crawl'], director: result['director'] });
                }
            };
            filmscall.send();
        }
        return arr;
    }

    render() {

        return (
            <div>
                <button type="submit" className="button button--yellow button--md mb-3" onClick={this.callsv}>Submit</button>
                <div>
                    {this.state.items}
                </div>
            </div>
        );
    }
}

export default Services;