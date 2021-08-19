import csv
import json

# Converts a string into a number
def num(val):
  try:
    num = float(val)
    return num
  except:
    return 0

# Adds a value to the key if it exists otherwise it creates it
def add_to_obj(obj, key, val):
  if key in obj:
    obj[key] += val
  else:
    obj[key] = val


final_data = {}

# Opens the covid cases + Deaths files and extracts the relevant data
with open('covid_cases_deaths.csv') as csv_file:

  cases_csv = csv.reader(csv_file, delimiter=',')
  row_count = 0

  for row in cases_csv:
    # Skips the header row
    if row_count == 0:
      row_count += 1
      continue

    # Extracts the required column
    date, state, total_cases, total_deaths = row[0], row[1], row[2], row[7]

    if date not in final_data:
      final_data[date] = {}

    if state not in final_data[date]:
      final_data[date][state] = {}

    final_data[date][state]["total_cases"] = num(total_cases)
    final_data[date][state]["total_deaths"] = num(total_deaths)

# Opens the covid vaccination rates file and extracts the relevant data
with open('covid_vax.csv') as csv_file:

  cases_csv = csv.reader(csv_file, delimiter=',')
  row_count = 0

  for row in cases_csv:
    # Skips the header row
    if row_count == 0:
      row_count += 1
      continue

    # Adds the date entry to the final data
    date, state, pop_vax_pct, twelve_vax_pct, eighteen_vax_pct, old_vax_pct = \
      row[0], row[4], row[5], row[8], row[10], row[12]

    if date not in final_data:
      final_data[date] = {}

    # Skips states that do not have cases / death data
    if state not in final_data[date]:
      continue

    add_to_obj(final_data[date][state], "pop_vax_pct", num(pop_vax_pct ))
    add_to_obj(final_data[date][state], "twelve_vax_pct", num(twelve_vax_pct ))
    add_to_obj(final_data[date][state], "eighteen_vax_pct", num(eighteen_vax_pct ))
    add_to_obj(final_data[date][state], "old_vax_pct", num(old_vax_pct ))

# Saves the data to a final JSON
with open('data.json', 'w') as f:
  json.dump(final_data, f)





