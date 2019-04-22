export default [{
  'id': '1111111',
  'attributes': {
    'start_time': {
      'type': 'text',
      'specification': {
        'min_length': 5,
        'max_length': 300,
        'required': true,
      },
    },
    'end_time': {
      'type': 'text',
      'specification': {
        'min_length': 5,
        'max_length': 300,
        'required': true,
      },
    },
    'finish_time': {
      'type': 'text',
      'specification': {
        'min_length': 5,
        'max_length': 300,
        'required': true,
      },
    },
    'description': {
      'type': 'text',
      'specification': {
        'min_length': 5,
        'max_length': 300,
        'required': true,
      },
    },
    'prize_amount': {
      'type': 'number',
      'specification': {
        'min': 1,
        'max': 100,
        'required': true,
      },
    },
    'date': {
      'type': 'date',
      'specification': {
        'required': true,
      },
    },
  },
}]