import pandas as pd

df = pd.read_csv('assets/img/lorongaifind.csv')

df.to_html('lorong.fined.html')