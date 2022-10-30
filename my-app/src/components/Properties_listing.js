import React, { Component } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import '../index.css';

function LayoutComponent() {

    const [filterText, setFilterText] = useState('');
    const [property, setProperty] = useState([]);
    const [linkClicked, setClicked] = useState('');

    useEffect(() => {
        fetch('properties.json')
            .then(res => res.json())
            .then(data => {
                setProperty(data)
            }
            )
            .catch(console.log)
    }, []);
    if (linkClicked != null) {
        console.log(linkClicked);
    }
    if (linkClicked) {
        return (
            <div>
                <br />
                <a href = "index.html">
                <button>Back</button>
                </a>
                
                <div class="container overflow-hidden">
                    <Slide
                        property={property}
                        linkClicked={linkClicked}
                    />
                </div>
            </div>
        );
    }
    else {
        return (
            <div>
                <br/>
                <SearchBar
                    filterText={filterText}
                    onFilterTextChange={setFilterText} />
                <br/>
                <div class="container overflow-hidden">
                    <Properties
                        filterText={filterText}
                        property={property}
                        linkClicked={linkClicked}
                        onlinkClicked={setClicked}
                         />
                </div>
            </div>
        );
    }
}

function Slide({ property, linkClicked }) {
    var rows = [];

    property.forEach((video) => {
        if (video.id === linkClicked) {
            rows.push(video);
        }
    });
    return (
        rows.map((p) => (
            <div class="card" id={p.id} style={{ marginBottom: 5 + 'em', minHeight: 24 + 'em' }} >
                <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel" >
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="card-img-top d-block w-100" src={p.path} alt="Card image cap" />
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src="property-1.1.png" alt="Second slide" />
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title"><span class="start">{p.place}</span><span class="end">{p.ratings}</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
                        <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                    </svg></h5>
                    <p class="card-text">
                        {p.host}<br>
                        </br>
                        <b>Bedrooms</b> : {p.bedrooms}
                        <br />
                        <b>Amenities</b> : {p.amenities}
                        <br />
                        <b>Per Night Fee</b> : {p.night_fee}
                        <br />
                        <b>Cleaning Fee per stay</b> : {p.cleaning_fee}
                        <br />
                        <b>Service Fee per stay</b> : {p.service_fee}
                        <br />
                        <b>Property Description</b> : {p.description}
                        <br />
                    </p>
                </div>
            </div>
        )
        )
    );
}

function SearchBar({ filterText, onFilterTextChange }) {
    return (
        <div class="d-flex justify-content-center ">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 list-group-horizontal ">
                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <div class="input-group">
                        <input type="text" value={filterText} class="form-control" placeholder="Search..."
                            aria-label="Input group example" aria-describedby="btnGroupAddon" onChange={(e) => onFilterTextChange(e.target.value)} />
                        <div class="input-group-text" id="btnGroupAddon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    )
}


function Properties({ property, filterText, linkClicked, onlinkClicked }) {
    var val = filterText;
    var rows = [];
  //  buttonClicked(false);
    property.forEach((video) => {
        if (
            video.place.toLowerCase().indexOf(
                filterText.toLowerCase()
            ) === -1
        ) {
            return;
        }
        rows.push(video);
    });
    return (
        <div class="card-deck">
            {
                rows.map((p) => (
                    <div class="col-3">
                        <div class="card" id={p.id} style={{ marginBottom: 5 + 'em', minHeight: 24 + 'em' }} >
                            <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel" >
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img class="card-img-top d-block w-100" id={p.id} src={p.path} alt="Card image cap" onClick={(e) => onlinkClicked(e.target.id)} />
                                    </div>
                                    <div class="carousel-item">
                                        <img class="d-block w-100" src="property-1.1.png" alt="Second slide" />
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <h6 class="card-title">{p.place} &nbsp;&nbsp;&nbsp; {p.ratings}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
                                    <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                                </svg></h6>
                                <p class="card-text">
                                    <small class="text-muted">
                                        {p.host}<br>
                                        </br>
                                        {p.night_fee}<br>
                                        </br>
                                        {p.amenities}
                                    </small>
                                </p>
                                <p class="card-text"><small class="text-muted"><b>About:</b> {p.short_description} </small></p>
                            </div>
                        </div>
                    </div>
                )
                )
            }
        </div>
    );
}

class Properties_listing extends Component {
    render() {
        return (
            <div>
                <LayoutComponent />
            </div>
        );
    }
}

export default Properties_listing;