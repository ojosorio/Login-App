import React, { Component } from "react";


class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: "",
            name: "https://swapi.dev/api/people/"
        };

        this.callsv = this.callsv.bind(this);
        this.clear = this.clear.bind(this);
    }

    clear() {
        this.setState({
            isLoaded: true,
            items: ""
        });
    }

    callsv() {
        fetch("https://swapi.dev/api/people/")
            .then(res => res.json())
            .then(
                (result) => {
                    let apiResult = result['results'];
                    let arrResult = [];

                    for (let i = 0; i < apiResult.length; i++) {
                        let hm = this.getHomeworld(apiResult[i]['homeworld']);
                        let flm = this.getFilm(apiResult[i]['films']);
                        hm.then((result) => {
                            let totalresult = {
                                name: apiResult[i]['name'],
                                hair_color: apiResult[i]['hair_color'],
                                skin_color: apiResult[i]['skin_color'],
                                gender: apiResult[i]['gender'],
                                homeworld: result,
                                films: flm
                            };
                            arrResult.push(totalresult);
                        });
                    }

                    setTimeout(() => {
                        this.setState({
                            isLoaded: true,
                            items: JSON.stringify(arrResult)
                        });
                    }, 1000);
                    console.log(arrResult);
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        items: error
                    });
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
                <h2>Services</h2>
                <div className="row">
                    <div className="col-md-6">
                        <button type="submit" className="button button--green button--lg mb-3" onClick={this.callsv}>Get Data</button>
                    </div>
                    <div className="col-md-6">
                        <button type="submit" className="button button--gray button--lg mb-3" onClick={this.clear}>Clear</button>
                    </div>
                </div>

                <h4>Service Name: {this.state.name}</h4>
                <div>
                    {this.state.items}
                </div>
            </div>
        );
    }
}

export default Services;