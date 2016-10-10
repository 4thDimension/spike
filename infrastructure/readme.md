# Infrastructure Setup

MongoDB cluster with automatic ElasticSearch syncing. Kibana included to manage ES.

Currently syncing is only at the transporter-collection/entries collection.

## Requirements

* [Docker](https://docs.docker.com/engine/installation/)
* [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

* Run `docker-compose up` for initial setup
* Use `docker-compose stop` and `docker-compose start` to reuse the services
* First run will take a while, wait until the transporter creates the `transporter-collection` index.

## Usage

* Kibana `http://localhost:5601`
* Mongo `http://localhost:27017`
* ES `http://localhost:9200`


## Troubleshooting

* Run `docker volume rm $(docker volume ls -qf dangling=true)` to clean up unused volumens after taking down the infrastructure.
