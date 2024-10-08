def parse_keys(string: str):
  """
  Parses the first line of a string to extract keys, ensuring multi-word keys
  are joined with an underscore (snake_case).

  Args:
    string (str): Input string where the first line contains the keys.

  Returns:
    list: A list of processed key strings in lowercase. Multi-word keys
          are joined with underscores ('_').
  """
  keyString = string.split('\n')[0]
  keyWords = keyString.strip().split()
  keys = []

  for word in keyWords:
    if word.islower():
      keys[-1] += f'_{word}'
    else:
      keys.append(word.lower())

  return keys

def parse_values(string: str, maxsplit: int):
  """
  Parses the remaining lines of the string to extract values, splitting each line
  based on the provided maxsplit.

  Args:
    string (str): Input string where the second line onward contains values.
    maxsplit (int): The maximum number of splits to perform on each value line.

  Returns:
    list: A list of lists, where each sublist represents the parsed values from each line.
  """
  valueString = string.split('\n')[1:]
  values = list(map(lambda x: x.strip().split(maxsplit=maxsplit), valueString))

  return values

def parse_data(string: str, maxsplit: int = -1):
  """
  Parses the input string into a dictionary or a list of dictionaries, 
  using the first line for keys and subsequent lines for values.

  Args:
    string (str): Input string with keys in the first line and values in subsequent lines.
    maxsplit (int, optional): The maximum number of splits to perform when parsing values. 
                              Defaults to -1 (no limit).

  Returns:
    dict | list | string: A dictionary if only one line of values is present, or a list of 
                          dictionaries if multiple lines of values are present. If parsing fails,
                          the original string is returned.
  """
  try:
    keys = parse_keys(string)
    values = parse_values(string, maxsplit)
    
    if len(values) == 1:
      return dict(zip(keys, values[0]))
    
    return list(dict(zip(keys, value)) for value in values)
  except:
    return string
  