<!--
NOTE: Maybe this should be an ipython notebook?
  - or each post should be accompanied by one?

Examples (should be applications of AI that everyone is familiar with)

- Spam filter (0 = no spam, 1 = spam)
  - transformation of email to (relative) word counts
    - easier first step: just set of words (there/not there)
    - even easier: just select 5 words, which seem important
  - "distance" = percentage of words occurring in both e-mails
- Netflix recommendations (0 = won't like, 1 = will like)


Topics (each could be one post):

- 1-NN
- k-NN
- Data: More is better
  - show performance gain with increasing amount of data
  - feature vector grows by one bit => percentage of feature space covered by samples is halved
  - => massive amounts of data required for complex problems
- Performance metrics
  - accuracy
  - precition/recall
  - sensitivity/specificity
  - f-measure
  - confusion matrix
- The problem of Generalization vs Overfitting
  - separate knowledge base into test and train set
  - only result on unseen data is interesting
  - what is truly unseen? (unseen date?, unseen sender?, ...)
  - think about variance to be expected in real world vs variance in training set
- Bias (never trust your data)
  - uneven distribution of samples per class
  - what if we filter out E-mails from dyslexics or foreign speakers?
  - who decides what is spam? (Ground truth)
- local vs global optimum: k as (hyper)-parameter
  - increase by one until result becomes worse again
- unsupervised learning with kMeans
  - From kNN to jMeans: just slap j random vectors with class 1 to j in the kNN
- ANNs for dummies
- similarities between ANNs and kNN
  - both are classifiers (input vector -> class)
  - both rely on data
- differences between ANNs and kNN
  - number of parameters/features
  - black box
  - training effort / required hardware
-->