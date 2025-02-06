function isBaseType(object) {
  if (typeof object === 'string' ||
      typeof object === 'number' ||
      typeof object === 'boolean' ||
      object === null ||
      typeof object === 'undefined') {
    return true;
  }
  return false;
}

function serializeBaseType(object) {
  const transformedObject = {};
  if (typeof object === 'undefined') {
    transformedObject['__meta__specialType__'] = {type: typeof object, value: ''};
    return transformedObject;
  } else if (object === null) {
    transformedObject['__meta__specialType__'] = {type: 'null', value: ''};
    return transformedObject;
  } else {
    return object;
  }
}

function serializeFunction(object) {
  const stringFunc = object.toString();

  // Get the part between the first '(' and ')'
  const paramsStart = stringFunc.indexOf('(') + 1;
  const paramsEnd = stringFunc.indexOf(')');
  const paramsString = stringFunc.slice(paramsStart, paramsEnd).trim();

  // Split the parameters by commas and remove extra whitespace
  const params = paramsString ? paramsString.split(',').map((param) => param.trim()) : [];

  // Determine if function uses braces `{}` or not
  const arrowIndex = stringFunc.indexOf('=>');
  const bodyStart = stringFunc.indexOf('{');
  
  let bodyString = '';

  if (bodyStart !== -1) {
    // Regular function body with {}
    const bodyEnd = stringFunc.lastIndexOf('}');
    bodyString = stringFunc.slice(bodyStart + 1, bodyEnd).trim();
  } else if (arrowIndex !== -1) {
    // Arrow function without braces
    bodyString = stringFunc.slice(arrowIndex + 2).trim();
  }

  // Find the first occurence of { and }
  // const bodyStart = stringFunc.indexOf('{') + 1;
  // const bodyEnd = stringFunc.lastIndexOf('}');
  // const bodyString = stringFunc.slice(bodyStart, bodyEnd).trim();

  const funcObj = {type: 'function', parameters: params, body: 'return ' + bodyString};
  const transformedObject = {};
  transformedObject['__meta__specialType__'] = funcObj;
  return transformedObject;
}

function serializeDate(object) {
  return {
    __meta__specialType__: 'Date',
    value: object.toISOString(), // Store the ISO string representation of the Date
  };
}

function serializeError(error) {
  return {
    __meta__specialType__: 'Error',
    message: error.message,
    stack: error.stack,
  };
}

function serializeHelper(object) {
  // Base case in which we return a serialize
  if (isBaseType(object) === true) {
    // Serialize base-type
    return serializeBaseType(object);
  }

  // Another base case in which we return a serialized function
  if (typeof object === 'function') {
    return serializeFunction(object);
  }

  // Base case for date objects
  if (object instanceof Date) {
    return serializeDate(object);
  }

  // Base case for date objects
  if (object instanceof Error) {
    return serializeError(object);
  }

  // If object is array, iterate over each element
  if (Array.isArray(object)) {
    return object.map(serializeHelper);
  }

  // Handle objects
  if (typeof object === 'object') {
    const serializedObj = {};
    for (const key in object) {
      serializedObj[key] = serializeHelper(object[key]); // Recursively serialize each property
    }
    return serializedObj;
  }
  return 'Invalid Object Type';
}

function serialize(object) {
  const transformedObject = serializeHelper(object);
  return JSON.stringify(transformedObject);
}

function deserializeBaseCase(object) {
  // Case 1: Typical base-case
  if (typeof object === 'string' || typeof object === 'number' || typeof object === 'boolean') {
    return object;
  }
  // Case 2: null
  if (object.__meta__specialType__.type === 'null') {
    return null;
  }
  // Case 3: undefined
  if (object.__meta__specialType__.type === 'undefined') {
    return undefined;
  }
  // Case 4: Function
  if (object.__meta__specialType__.type === 'function') {
    const func = new Function(...object.__meta__specialType__.parameters, object.__meta__specialType__.body);
    return func;
  }
}

function deserializeDate(object) {
  return new Date(object.value);
}

function deserializeError(object) {
  const error = new Error(object.message);
  error.stack = object.stack;
  return error;
}

function deserializeHelper(object) {
  // Handle Date
  if (object.__meta__specialType__ === 'Date') {
    return deserializeDate(object);
  }
  // Handle Error
  if (object.__meta__specialType__ === 'Error') {
    return deserializeError(object);
  }
  // Handle base case
  if (isBaseType(object) == true || object.__meta__specialType__) {
    return deserializeBaseCase(object);
  }
  // Handle Arrays
  if (Array.isArray(object)) {
    return object.map(deserializeHelper);
  }
  // Handle Objects
  if (typeof object === 'object') {
    const deserializedObj = {};
    for (const key in object) {
      deserializedObj[key] = deserializeHelper(object[key]);
    }
    return deserializedObj;
  }
  return object;
}

function deserialize(string) {
  let object = ''
  try {
    object = JSON.parse(string);
  } catch (error) {
  } finally {
    if (object === '') {
      throw new SyntaxError('Invalid input');
    }

    const deserializedObj = deserializeHelper(object);
    return deserializedObj;
  }
}

module.exports = {
  serialize: serialize,
  deserialize: deserialize,
};
