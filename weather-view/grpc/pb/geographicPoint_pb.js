// source: src/proto/geographicPoint.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require("google-protobuf");
var goog = jspb;
var global = function () {
  if (this) {
    return this;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  return Function("return this")();
}.call(null);

goog.exportSymbol("proto.pb.AddGeographicPointRequest", null, global);
goog.exportSymbol(
  "proto.pb.GetWeatherListByGeographicPointRequest",
  null,
  global
);
goog.exportSymbol(
  "proto.pb.GetWeatherListByGeographicPointResponse",
  null,
  global
);
goog.exportSymbol("proto.pb.RegsiterGeographicPointResponse", null, global);
goog.exportSymbol("proto.pb.WeatherByGeographicPoint", null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.AddGeographicPointRequest = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.AddGeographicPointRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.AddGeographicPointRequest.displayName =
    "proto.pb.AddGeographicPointRequest";
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.RegsiterGeographicPointResponse = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.RegsiterGeographicPointResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.RegsiterGeographicPointResponse.displayName =
    "proto.pb.RegsiterGeographicPointResponse";
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetWeatherListByGeographicPointRequest = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.GetWeatherListByGeographicPointRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetWeatherListByGeographicPointRequest.displayName =
    "proto.pb.GetWeatherListByGeographicPointRequest";
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetWeatherListByGeographicPointResponse = function (opt_data) {
  jspb.Message.initialize(
    this,
    opt_data,
    0,
    -1,
    proto.pb.GetWeatherListByGeographicPointResponse.repeatedFields_,
    null
  );
};
goog.inherits(proto.pb.GetWeatherListByGeographicPointResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetWeatherListByGeographicPointResponse.displayName =
    "proto.pb.GetWeatherListByGeographicPointResponse";
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.WeatherByGeographicPoint = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.WeatherByGeographicPoint, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.WeatherByGeographicPoint.displayName =
    "proto.pb.WeatherByGeographicPoint";
}

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.pb.AddGeographicPointRequest.prototype.toObject = function (
    opt_includeInstance
  ) {
    return proto.pb.AddGeographicPointRequest.toObject(
      opt_includeInstance,
      this
    );
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.pb.AddGeographicPointRequest} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.pb.AddGeographicPointRequest.toObject = function (
    includeInstance,
    msg
  ) {
    var f,
      obj = {
        name: jspb.Message.getFieldWithDefault(msg, 1, ""),
        lat: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
        lon: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
        displayorder: jspb.Message.getFieldWithDefault(msg, 4, 0),
      };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.AddGeographicPointRequest}
 */
proto.pb.AddGeographicPointRequest.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.AddGeographicPointRequest();
  return proto.pb.AddGeographicPointRequest.deserializeBinaryFromReader(
    msg,
    reader
  );
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.AddGeographicPointRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.AddGeographicPointRequest}
 */
proto.pb.AddGeographicPointRequest.deserializeBinaryFromReader = function (
  msg,
  reader
) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString());
        msg.setName(value);
        break;
      case 2:
        var value = /** @type {number} */ (reader.readDouble());
        msg.setLat(value);
        break;
      case 3:
        var value = /** @type {number} */ (reader.readDouble());
        msg.setLon(value);
        break;
      case 4:
        var value = /** @type {number} */ (reader.readInt32());
        msg.setDisplayorder(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.AddGeographicPointRequest.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.pb.AddGeographicPointRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.AddGeographicPointRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.AddGeographicPointRequest.serializeBinaryToWriter = function (
  message,
  writer
) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
  f = message.getLat();
  if (f !== 0.0) {
    writer.writeDouble(2, f);
  }
  f = message.getLon();
  if (f !== 0.0) {
    writer.writeDouble(3, f);
  }
  f = message.getDisplayorder();
  if (f !== 0) {
    writer.writeInt32(4, f);
  }
};

/**
 * optional string name = 1;
 * @return {string}
 */
proto.pb.AddGeographicPointRequest.prototype.getName = function () {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};

/**
 * @param {string} value
 * @return {!proto.pb.AddGeographicPointRequest} returns this
 */
proto.pb.AddGeographicPointRequest.prototype.setName = function (value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional double lat = 2;
 * @return {number}
 */
proto.pb.AddGeographicPointRequest.prototype.getLat = function () {
  return /** @type {number} */ (
    jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0)
  );
};

/**
 * @param {number} value
 * @return {!proto.pb.AddGeographicPointRequest} returns this
 */
proto.pb.AddGeographicPointRequest.prototype.setLat = function (value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};

/**
 * optional double lon = 3;
 * @return {number}
 */
proto.pb.AddGeographicPointRequest.prototype.getLon = function () {
  return /** @type {number} */ (
    jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0)
  );
};

/**
 * @param {number} value
 * @return {!proto.pb.AddGeographicPointRequest} returns this
 */
proto.pb.AddGeographicPointRequest.prototype.setLon = function (value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};

/**
 * optional int32 displayOrder = 4;
 * @return {number}
 */
proto.pb.AddGeographicPointRequest.prototype.getDisplayorder = function () {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};

/**
 * @param {number} value
 * @return {!proto.pb.AddGeographicPointRequest} returns this
 */
proto.pb.AddGeographicPointRequest.prototype.setDisplayorder = function (
  value
) {
  return jspb.Message.setProto3IntField(this, 4, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.pb.RegsiterGeographicPointResponse.prototype.toObject = function (
    opt_includeInstance
  ) {
    return proto.pb.RegsiterGeographicPointResponse.toObject(
      opt_includeInstance,
      this
    );
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.pb.RegsiterGeographicPointResponse} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.pb.RegsiterGeographicPointResponse.toObject = function (
    includeInstance,
    msg
  ) {
    var f,
      obj = {};

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.RegsiterGeographicPointResponse}
 */
proto.pb.RegsiterGeographicPointResponse.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.RegsiterGeographicPointResponse();
  return proto.pb.RegsiterGeographicPointResponse.deserializeBinaryFromReader(
    msg,
    reader
  );
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.RegsiterGeographicPointResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.RegsiterGeographicPointResponse}
 */
proto.pb.RegsiterGeographicPointResponse.deserializeBinaryFromReader =
  function (msg, reader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) {
        break;
      }
      var field = reader.getFieldNumber();
      switch (field) {
        default:
          reader.skipField();
          break;
      }
    }
    return msg;
  };

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.RegsiterGeographicPointResponse.prototype.serializeBinary =
  function () {
    var writer = new jspb.BinaryWriter();
    proto.pb.RegsiterGeographicPointResponse.serializeBinaryToWriter(
      this,
      writer
    );
    return writer.getResultBuffer();
  };

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.RegsiterGeographicPointResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.RegsiterGeographicPointResponse.serializeBinaryToWriter = function (
  message,
  writer
) {
  var f = undefined;
};

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.pb.GetWeatherListByGeographicPointRequest.prototype.toObject =
    function (opt_includeInstance) {
      return proto.pb.GetWeatherListByGeographicPointRequest.toObject(
        opt_includeInstance,
        this
      );
    };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.pb.GetWeatherListByGeographicPointRequest} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.pb.GetWeatherListByGeographicPointRequest.toObject = function (
    includeInstance,
    msg
  ) {
    var f,
      obj = {};

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetWeatherListByGeographicPointRequest}
 */
proto.pb.GetWeatherListByGeographicPointRequest.deserializeBinary = function (
  bytes
) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetWeatherListByGeographicPointRequest();
  return proto.pb.GetWeatherListByGeographicPointRequest.deserializeBinaryFromReader(
    msg,
    reader
  );
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetWeatherListByGeographicPointRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetWeatherListByGeographicPointRequest}
 */
proto.pb.GetWeatherListByGeographicPointRequest.deserializeBinaryFromReader =
  function (msg, reader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) {
        break;
      }
      var field = reader.getFieldNumber();
      switch (field) {
        default:
          reader.skipField();
          break;
      }
    }
    return msg;
  };

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetWeatherListByGeographicPointRequest.prototype.serializeBinary =
  function () {
    var writer = new jspb.BinaryWriter();
    proto.pb.GetWeatherListByGeographicPointRequest.serializeBinaryToWriter(
      this,
      writer
    );
    return writer.getResultBuffer();
  };

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetWeatherListByGeographicPointRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetWeatherListByGeographicPointRequest.serializeBinaryToWriter =
  function (message, writer) {
    var f = undefined;
  };

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.pb.GetWeatherListByGeographicPointResponse.repeatedFields_ = [1];

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.pb.GetWeatherListByGeographicPointResponse.prototype.toObject =
    function (opt_includeInstance) {
      return proto.pb.GetWeatherListByGeographicPointResponse.toObject(
        opt_includeInstance,
        this
      );
    };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.pb.GetWeatherListByGeographicPointResponse} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.pb.GetWeatherListByGeographicPointResponse.toObject = function (
    includeInstance,
    msg
  ) {
    var f,
      obj = {
        weatherbygeographicpointList: jspb.Message.toObjectList(
          msg.getWeatherbygeographicpointList(),
          proto.pb.WeatherByGeographicPoint.toObject,
          includeInstance
        ),
      };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetWeatherListByGeographicPointResponse}
 */
proto.pb.GetWeatherListByGeographicPointResponse.deserializeBinary = function (
  bytes
) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetWeatherListByGeographicPointResponse();
  return proto.pb.GetWeatherListByGeographicPointResponse.deserializeBinaryFromReader(
    msg,
    reader
  );
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetWeatherListByGeographicPointResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetWeatherListByGeographicPointResponse}
 */
proto.pb.GetWeatherListByGeographicPointResponse.deserializeBinaryFromReader =
  function (msg, reader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) {
        break;
      }
      var field = reader.getFieldNumber();
      switch (field) {
        case 1:
          var value = new proto.pb.WeatherByGeographicPoint();
          reader.readMessage(
            value,
            proto.pb.WeatherByGeographicPoint.deserializeBinaryFromReader
          );
          msg.addWeatherbygeographicpoint(value);
          break;
        default:
          reader.skipField();
          break;
      }
    }
    return msg;
  };

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetWeatherListByGeographicPointResponse.prototype.serializeBinary =
  function () {
    var writer = new jspb.BinaryWriter();
    proto.pb.GetWeatherListByGeographicPointResponse.serializeBinaryToWriter(
      this,
      writer
    );
    return writer.getResultBuffer();
  };

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetWeatherListByGeographicPointResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetWeatherListByGeographicPointResponse.serializeBinaryToWriter =
  function (message, writer) {
    var f = undefined;
    f = message.getWeatherbygeographicpointList();
    if (f.length > 0) {
      writer.writeRepeatedMessage(
        1,
        f,
        proto.pb.WeatherByGeographicPoint.serializeBinaryToWriter
      );
    }
  };

/**
 * repeated WeatherByGeographicPoint weatherByGeographicPoint = 1;
 * @return {!Array<!proto.pb.WeatherByGeographicPoint>}
 */
proto.pb.GetWeatherListByGeographicPointResponse.prototype.getWeatherbygeographicpointList =
  function () {
    return /** @type{!Array<!proto.pb.WeatherByGeographicPoint>} */ (
      jspb.Message.getRepeatedWrapperField(
        this,
        proto.pb.WeatherByGeographicPoint,
        1
      )
    );
  };

/**
 * @param {!Array<!proto.pb.WeatherByGeographicPoint>} value
 * @return {!proto.pb.GetWeatherListByGeographicPointResponse} returns this
 */
proto.pb.GetWeatherListByGeographicPointResponse.prototype.setWeatherbygeographicpointList =
  function (value) {
    return jspb.Message.setRepeatedWrapperField(this, 1, value);
  };

/**
 * @param {!proto.pb.WeatherByGeographicPoint=} opt_value
 * @param {number=} opt_index
 * @return {!proto.pb.WeatherByGeographicPoint}
 */
proto.pb.GetWeatherListByGeographicPointResponse.prototype.addWeatherbygeographicpoint =
  function (opt_value, opt_index) {
    return jspb.Message.addToRepeatedWrapperField(
      this,
      1,
      opt_value,
      proto.pb.WeatherByGeographicPoint,
      opt_index
    );
  };

/**
 * Clears the list making it empty but non-null.
 * @return {!proto.pb.GetWeatherListByGeographicPointResponse} returns this
 */
proto.pb.GetWeatherListByGeographicPointResponse.prototype.clearWeatherbygeographicpointList =
  function () {
    return this.setWeatherbygeographicpointList([]);
  };

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.pb.WeatherByGeographicPoint.prototype.toObject = function (
    opt_includeInstance
  ) {
    return proto.pb.WeatherByGeographicPoint.toObject(
      opt_includeInstance,
      this
    );
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.pb.WeatherByGeographicPoint} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.pb.WeatherByGeographicPoint.toObject = function (includeInstance, msg) {
    var f,
      obj = {
        unixtime: jspb.Message.getFieldWithDefault(msg, 1, 0),
        pointid: jspb.Message.getFieldWithDefault(msg, 2, ""),
        pointname: jspb.Message.getFieldWithDefault(msg, 3, ""),
        lat: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
        lon: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0),
        displayorder: jspb.Message.getFieldWithDefault(msg, 6, 0),
        weathericon: jspb.Message.getFieldWithDefault(msg, 7, ""),
        tempfeelslike: jspb.Message.getFloatingPointFieldWithDefault(
          msg,
          8,
          0.0
        ),
        tempmin: jspb.Message.getFloatingPointFieldWithDefault(msg, 9, 0.0),
        tempmax: jspb.Message.getFloatingPointFieldWithDefault(msg, 10, 0.0),
        clouds: jspb.Message.getFloatingPointFieldWithDefault(msg, 11, 0.0),
        rainfall: jspb.Message.getFloatingPointFieldWithDefault(msg, 12, 0.0),
        humidity: jspb.Message.getFloatingPointFieldWithDefault(msg, 13, 0.0),
        windspeed: jspb.Message.getFloatingPointFieldWithDefault(msg, 14, 0.0),
        pressure: jspb.Message.getFloatingPointFieldWithDefault(msg, 15, 0.0),
      };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.WeatherByGeographicPoint}
 */
proto.pb.WeatherByGeographicPoint.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.WeatherByGeographicPoint();
  return proto.pb.WeatherByGeographicPoint.deserializeBinaryFromReader(
    msg,
    reader
  );
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.WeatherByGeographicPoint} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.WeatherByGeographicPoint}
 */
proto.pb.WeatherByGeographicPoint.deserializeBinaryFromReader = function (
  msg,
  reader
) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {number} */ (reader.readInt64());
        msg.setUnixtime(value);
        break;
      case 2:
        var value = /** @type {string} */ (reader.readString());
        msg.setPointid(value);
        break;
      case 3:
        var value = /** @type {string} */ (reader.readString());
        msg.setPointname(value);
        break;
      case 4:
        var value = /** @type {number} */ (reader.readDouble());
        msg.setLat(value);
        break;
      case 5:
        var value = /** @type {number} */ (reader.readDouble());
        msg.setLon(value);
        break;
      case 6:
        var value = /** @type {number} */ (reader.readInt32());
        msg.setDisplayorder(value);
        break;
      case 7:
        var value = /** @type {string} */ (reader.readString());
        msg.setWeathericon(value);
        break;
      case 8:
        var value = /** @type {number} */ (reader.readDouble());
        msg.setTempfeelslike(value);
        break;
      case 9:
        var value = /** @type {number} */ (reader.readDouble());
        msg.setTempmin(value);
        break;
      case 10:
        var value = /** @type {number} */ (reader.readDouble());
        msg.setTempmax(value);
        break;
      case 11:
        var value = /** @type {number} */ (reader.readDouble());
        msg.setClouds(value);
        break;
      case 12:
        var value = /** @type {number} */ (reader.readDouble());
        msg.setRainfall(value);
        break;
      case 13:
        var value = /** @type {number} */ (reader.readDouble());
        msg.setHumidity(value);
        break;
      case 14:
        var value = /** @type {number} */ (reader.readDouble());
        msg.setWindspeed(value);
        break;
      case 15:
        var value = /** @type {number} */ (reader.readDouble());
        msg.setPressure(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.WeatherByGeographicPoint.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.pb.WeatherByGeographicPoint.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.WeatherByGeographicPoint} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.WeatherByGeographicPoint.serializeBinaryToWriter = function (
  message,
  writer
) {
  var f = undefined;
  f = message.getUnixtime();
  if (f !== 0) {
    writer.writeInt64(1, f);
  }
  f = message.getPointid();
  if (f.length > 0) {
    writer.writeString(2, f);
  }
  f = message.getPointname();
  if (f.length > 0) {
    writer.writeString(3, f);
  }
  f = message.getLat();
  if (f !== 0.0) {
    writer.writeDouble(4, f);
  }
  f = message.getLon();
  if (f !== 0.0) {
    writer.writeDouble(5, f);
  }
  f = message.getDisplayorder();
  if (f !== 0) {
    writer.writeInt32(6, f);
  }
  f = message.getWeathericon();
  if (f.length > 0) {
    writer.writeString(7, f);
  }
  f = message.getTempfeelslike();
  if (f !== 0.0) {
    writer.writeDouble(8, f);
  }
  f = message.getTempmin();
  if (f !== 0.0) {
    writer.writeDouble(9, f);
  }
  f = message.getTempmax();
  if (f !== 0.0) {
    writer.writeDouble(10, f);
  }
  f = message.getClouds();
  if (f !== 0.0) {
    writer.writeDouble(11, f);
  }
  f = message.getRainfall();
  if (f !== 0.0) {
    writer.writeDouble(12, f);
  }
  f = message.getHumidity();
  if (f !== 0.0) {
    writer.writeDouble(13, f);
  }
  f = message.getWindspeed();
  if (f !== 0.0) {
    writer.writeDouble(14, f);
  }
  f = message.getPressure();
  if (f !== 0.0) {
    writer.writeDouble(15, f);
  }
};

/**
 * optional int64 unixTime = 1;
 * @return {number}
 */
proto.pb.WeatherByGeographicPoint.prototype.getUnixtime = function () {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};

/**
 * @param {number} value
 * @return {!proto.pb.WeatherByGeographicPoint} returns this
 */
proto.pb.WeatherByGeographicPoint.prototype.setUnixtime = function (value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};

/**
 * optional string pointId = 2;
 * @return {string}
 */
proto.pb.WeatherByGeographicPoint.prototype.getPointid = function () {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};

/**
 * @param {string} value
 * @return {!proto.pb.WeatherByGeographicPoint} returns this
 */
proto.pb.WeatherByGeographicPoint.prototype.setPointid = function (value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};

/**
 * optional string pointName = 3;
 * @return {string}
 */
proto.pb.WeatherByGeographicPoint.prototype.getPointname = function () {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};

/**
 * @param {string} value
 * @return {!proto.pb.WeatherByGeographicPoint} returns this
 */
proto.pb.WeatherByGeographicPoint.prototype.setPointname = function (value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};

/**
 * optional double lat = 4;
 * @return {number}
 */
proto.pb.WeatherByGeographicPoint.prototype.getLat = function () {
  return /** @type {number} */ (
    jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0)
  );
};

/**
 * @param {number} value
 * @return {!proto.pb.WeatherByGeographicPoint} returns this
 */
proto.pb.WeatherByGeographicPoint.prototype.setLat = function (value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};

/**
 * optional double lon = 5;
 * @return {number}
 */
proto.pb.WeatherByGeographicPoint.prototype.getLon = function () {
  return /** @type {number} */ (
    jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0)
  );
};

/**
 * @param {number} value
 * @return {!proto.pb.WeatherByGeographicPoint} returns this
 */
proto.pb.WeatherByGeographicPoint.prototype.setLon = function (value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};

/**
 * optional int32 displayOrder = 6;
 * @return {number}
 */
proto.pb.WeatherByGeographicPoint.prototype.getDisplayorder = function () {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};

/**
 * @param {number} value
 * @return {!proto.pb.WeatherByGeographicPoint} returns this
 */
proto.pb.WeatherByGeographicPoint.prototype.setDisplayorder = function (value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};

/**
 * optional string weatherIcon = 7;
 * @return {string}
 */
proto.pb.WeatherByGeographicPoint.prototype.getWeathericon = function () {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};

/**
 * @param {string} value
 * @return {!proto.pb.WeatherByGeographicPoint} returns this
 */
proto.pb.WeatherByGeographicPoint.prototype.setWeathericon = function (value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};

/**
 * optional double tempFeelsLike = 8;
 * @return {number}
 */
proto.pb.WeatherByGeographicPoint.prototype.getTempfeelslike = function () {
  return /** @type {number} */ (
    jspb.Message.getFloatingPointFieldWithDefault(this, 8, 0.0)
  );
};

/**
 * @param {number} value
 * @return {!proto.pb.WeatherByGeographicPoint} returns this
 */
proto.pb.WeatherByGeographicPoint.prototype.setTempfeelslike = function (
  value
) {
  return jspb.Message.setProto3FloatField(this, 8, value);
};

/**
 * optional double tempMin = 9;
 * @return {number}
 */
proto.pb.WeatherByGeographicPoint.prototype.getTempmin = function () {
  return /** @type {number} */ (
    jspb.Message.getFloatingPointFieldWithDefault(this, 9, 0.0)
  );
};

/**
 * @param {number} value
 * @return {!proto.pb.WeatherByGeographicPoint} returns this
 */
proto.pb.WeatherByGeographicPoint.prototype.setTempmin = function (value) {
  return jspb.Message.setProto3FloatField(this, 9, value);
};

/**
 * optional double tempMax = 10;
 * @return {number}
 */
proto.pb.WeatherByGeographicPoint.prototype.getTempmax = function () {
  return /** @type {number} */ (
    jspb.Message.getFloatingPointFieldWithDefault(this, 10, 0.0)
  );
};

/**
 * @param {number} value
 * @return {!proto.pb.WeatherByGeographicPoint} returns this
 */
proto.pb.WeatherByGeographicPoint.prototype.setTempmax = function (value) {
  return jspb.Message.setProto3FloatField(this, 10, value);
};

/**
 * optional double clouds = 11;
 * @return {number}
 */
proto.pb.WeatherByGeographicPoint.prototype.getClouds = function () {
  return /** @type {number} */ (
    jspb.Message.getFloatingPointFieldWithDefault(this, 11, 0.0)
  );
};

/**
 * @param {number} value
 * @return {!proto.pb.WeatherByGeographicPoint} returns this
 */
proto.pb.WeatherByGeographicPoint.prototype.setClouds = function (value) {
  return jspb.Message.setProto3FloatField(this, 11, value);
};

/**
 * optional double rainFall = 12;
 * @return {number}
 */
proto.pb.WeatherByGeographicPoint.prototype.getRainfall = function () {
  return /** @type {number} */ (
    jspb.Message.getFloatingPointFieldWithDefault(this, 12, 0.0)
  );
};

/**
 * @param {number} value
 * @return {!proto.pb.WeatherByGeographicPoint} returns this
 */
proto.pb.WeatherByGeographicPoint.prototype.setRainfall = function (value) {
  return jspb.Message.setProto3FloatField(this, 12, value);
};

/**
 * optional double humidity = 13;
 * @return {number}
 */
proto.pb.WeatherByGeographicPoint.prototype.getHumidity = function () {
  return /** @type {number} */ (
    jspb.Message.getFloatingPointFieldWithDefault(this, 13, 0.0)
  );
};

/**
 * @param {number} value
 * @return {!proto.pb.WeatherByGeographicPoint} returns this
 */
proto.pb.WeatherByGeographicPoint.prototype.setHumidity = function (value) {
  return jspb.Message.setProto3FloatField(this, 13, value);
};

/**
 * optional double windSpeed = 14;
 * @return {number}
 */
proto.pb.WeatherByGeographicPoint.prototype.getWindspeed = function () {
  return /** @type {number} */ (
    jspb.Message.getFloatingPointFieldWithDefault(this, 14, 0.0)
  );
};

/**
 * @param {number} value
 * @return {!proto.pb.WeatherByGeographicPoint} returns this
 */
proto.pb.WeatherByGeographicPoint.prototype.setWindspeed = function (value) {
  return jspb.Message.setProto3FloatField(this, 14, value);
};

/**
 * optional double pressure = 15;
 * @return {number}
 */
proto.pb.WeatherByGeographicPoint.prototype.getPressure = function () {
  return /** @type {number} */ (
    jspb.Message.getFloatingPointFieldWithDefault(this, 15, 0.0)
  );
};

/**
 * @param {number} value
 * @return {!proto.pb.WeatherByGeographicPoint} returns this
 */
proto.pb.WeatherByGeographicPoint.prototype.setPressure = function (value) {
  return jspb.Message.setProto3FloatField(this, 15, value);
};

goog.object.extend(exports, proto.pb);
