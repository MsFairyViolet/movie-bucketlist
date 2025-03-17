import csv
import json

movies = []

with open("movies.csv", encoding="utf-8") as csv_file:
    reader = csv.DictReader(csv_file, delimiter=";")
    
    for index, row in enumerate(reader, start=1):
        movie = {
            "id": index, 
            "series_id": int(row["series_id"].strip()),
            "title": row["title"].strip(),
            "year": int(row["year"].strip()),
            "genre": row["genre"].strip().split(";"),
            "watched": row["watched"].strip().lower() == "true",
            "color": row["colour"].strip(),
            "imdb_ranking": float(row["ranking"].strip()) if row["ranking"].strip() else None,
            "director": row["director"].strip(),
            "duration": row["duration"].strip(),
            "topic": row["topic"].strip(),
        }
        movies.append(movie)

# Save to JSON
with open("movies.json", "w", encoding="utf-8") as json_file:
    json.dump(movies, json_file, indent=4)

print("Converted CSV to movies.json successfully!")
