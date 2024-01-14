-- select *
-- from airport a
-- left join town t on a.town_ID = t.town_ID
-- where a.airport_ID in (3,4);

select 
	f.departureTimeDate,
    f.arrivalTimeDate,
    a1.airport_ID as dest_id,
    a2.airport_ID as dep_id,
    t1.town_ID AS DEST,
    t1.name as destination_town,
    t2.town_ID as DEP,
    t2.name as departure_town
from flight f
left join airport a1 on f.destinationAirport_ID = a1.airport_ID
left join airport a2 on f.departureAirport_ID = a2.airport_ID
left join town t1 on a1.town_ID = t1.town_ID
left join town t2 on a2.town_ID = t2.town_ID;

SELECT *
    FROM flight AS f
	LEFT JOIN airport AS a1 ON f.departureAirport_ID = a1.airport_ID
	LEFT JOIN town AS t1 ON a1.town_id = t1.town_ID
	LEFT JOIN airport AS a2 ON f.destinationAirport_ID = a2.airport_ID
	LEFT JOIN town AS t2 ON a2.town_id = t2.town_ID
    WHERE 
        t1.town_ID = 3
        AND t2.town_ID = 4
        AND DATE(f.departureTimeDate) = '2024-01-21';