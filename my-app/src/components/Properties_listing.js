import React, { Component } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

function LayoutComponent() {

    const [filterText, setFilterText] = useState('');
    const [property, setProperty] = useState([]);

    useEffect(() => {
        fetch('properties.json')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setProperty(data)
            }
            )
            .catch(console.log)
    }, []);

    return (
        <div>
            <SearchBar
                filterText={filterText}
                onFilterTextChange={setFilterText} />
            <div class="container overflow-hidden">
            <Properties 
                filterText={filterText}
                property={property} />
            </div>
             
        </div>

    );
}

function SearchBar({ filterText, onFilterTextChange }) {
    return (
        <div class="d-flex justify-content-center ">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 list-group-horizontal ">
                        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                            <div class="input-group">
                                <input type="text" value = {filterText} class="form-control" placeholder="Filter..."
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
     /*   <form>
            <input type="text" value={filterText} placeholder="Search..." onChange={(e) => onFilterTextChange(e.target.value)} />
            <br></br>
        </form> */
    )
}

function Properties({ property, filterText }) {
    var val = filterText;
    var rows =[];
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
    //    <div class="row gy-4">
        <div class="card-deck">
            {
                rows.map((p) => (
                    <div class ="col-md-3 ">
                    <div class="card" >
                        <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img class="card-img-top d-block w-100" src={p.path} alt="Card image cap" />
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="public/property-1.1.png" alt="Second slide" />
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{p.place}</h5>
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
    //    </div>
    );
}

/*function Properties1({ property }) {
    return (
        /*var mod_videos = [];
        if(val === null || val === ' ')
        {
          mod_videos = prod;
        }
        else
        {
          if(val2)
          {
            mod_videos = prod.filter(d => {return d.available}) 
            mod_videos = mod_videos.filter(d => {return d.title.startsWith(val)})
          }
          else
          {
            mod_videos = prod.filter(d => {return d.title.startsWith(val)})
          } 
        } 
        property.map((p) => {
            console.log(p);
            var src = p.path;
            console.log(src);
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={p.path} />
                <Card.Body>
                    <Card.Title>{p.place}</Card.Title>
                    <Card.Text>
                        {p.short_description}
                    </Card.Text>
                </Card.Body>
            </Card>
            console.log("hello");
        }
        )
    );
} */

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