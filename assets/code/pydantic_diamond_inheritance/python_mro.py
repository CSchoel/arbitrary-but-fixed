class Thing:
    def __init__(self, language_engine: object, algorithm_parameter: int):
        print(f"Base({language_engine}, {algorithm_parameter})")
        self.language_engine = language_engine
        self.algorithm_parameter = algorithm_parameter


class GermanThing(Thing):
    def __init__(self, language_engine: object = object(), **kwargs):
        print(f"GermanThing({language_engine}, {kwargs})")
        super().__init__(language_engine=language_engine, **kwargs)


class SimpleThing(Thing):
    def __init__(self, algorithm_parameter: int = 0, **kwargs):
        print(f"SimpleThing({algorithm_parameter}, {kwargs})")
        super().__init__(algorithm_parameter=algorithm_parameter, **kwargs)


class SimpleGermanThing(SimpleThing, GermanThing):
    def __init__(self):
        print("SimpleGermanThing()")
        super().__init__()


val = SimpleGermanThing()
