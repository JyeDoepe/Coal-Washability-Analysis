import pandas as pd

def process_data(data):
    data['C'] = data['B'] / data['B'].sum() * 100
    data['D'] = data['C'].cumsum()
    data['F'] = data['C'] * data['E'] / 100
    data['G'] = data['F'].cumsum()
    data['H'] = data['G'] / data['D'] * 100
    data['I'] = data['F'].sum() - data['G']
    data['J'] = 100 - data['D']
    data['K'] = data['I'] / data['J'] * 100
    data['M'] = None
    for i, row in data.iterrows():
        if i == 0:
            data['M'][i] = data['C'][i] / 2
        else:
            data['M'][i] = data['D'][i-1] + data['C'][i] / 2

    data = data.fillna("None")
    return data

if __name__ == '__main__':
    sample_data = pd.read_csv("app/data/sample1.csv")
    process_data(sample_data)